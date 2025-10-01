import pandas as pd
import re

def clean_text(text):
    """Normalize text for keyword matching"""
    if pd.isna(text):
        return ""
    text = str(text).lower()
    text = re.sub(r"[^a-z]", "", text)  # keep only letters
    return text

def extract_phonepe_swipe_cash_total_with_grand(input_file, output_file):
    df = pd.read_csv(input_file)

    # Clean Credit column
    df['Credit'] = (
        df['Credit'].astype(str)
        .str.replace(r"[^0-9.]", "", regex=True)
    )
    df['Credit'] = pd.to_numeric(df['Credit'], errors='coerce').fillna(0)

    # Keywords
    phonepe_keyword = clean_text("phonepe")
    swipe_keywords = [clean_text(k) for k in ["india transact", "hdfc", "imps"]]
    cash_keyword = clean_text("self")

    # Extract credits in order
    phonepe_values = []
    swipe_values = []
    cash_values = []

    for _, row in df.iterrows():
        credit = row['Credit']
        if credit <= 0:
            continue

        desc_clean = clean_text(row['Description'])

        if phonepe_keyword in desc_clean:
            phonepe_values.append(credit)
        elif any(k in desc_clean for k in swipe_keywords):
            swipe_values.append(credit)
        elif cash_keyword in desc_clean:
            cash_values.append(credit)

    # Pad all lists to same length
    max_len = max(len(phonepe_values), len(swipe_values), len(cash_values))
    phonepe_values += [0] * (max_len - len(phonepe_values))
    swipe_values += [0] * (max_len - len(swipe_values))
    cash_values += [0] * (max_len - len(cash_values))

    # Create DataFrame
    result_df = pd.DataFrame({
        "PHONE PAY": phonepe_values,
        "SWIPE": swipe_values,
        "CASH": cash_values
    })

    # Round values to 2 decimals
    for col in ["PHONE PAY", "SWIPE", "CASH"]:
        result_df[col] = result_df[col].apply(lambda x: round(x,2) if isinstance(x,float) else x)

    # Add TOTAL column
    result_df['TOTAL'] = result_df[['PHONE PAY', 'SWIPE', 'CASH']].sum(axis=1)

    # Add grand total row
    grand_total = {
        "PHONE PAY": result_df['PHONE PAY'].sum(),
        "SWIPE": result_df['SWIPE'].sum(),
        "CASH": result_df['CASH'].sum(),
        "TOTAL": result_df['TOTAL'].sum()
    }
    total_row = pd.DataFrame([grand_total])
    total_row.index = ["TOTAL"]
    # Optional: put the word TOTAL in a new column instead of index
    total_row.reset_index(inplace=True)
    total_row.rename(columns={"index": "S.NO"}, inplace=True)
    # Add empty S.NO for normal rows
    result_df.insert(0, "S.NO", range(1, len(result_df)+1))
    total_row.at[0, "S.NO"] = "TOTAL"

    # Append grand total row
    final_df = pd.concat([result_df, total_row], ignore_index=True)

    # Save CSV
    final_df.to_csv(output_file, index=False)
    print(f"✅ File saved as {output_file}")


if __name__ == "__main__":
    # Example usage
    extract_phonepe_swipe_cash_total_with_grand("sample.csv", "phonepe_swipe_cash_total_grand.csv")
