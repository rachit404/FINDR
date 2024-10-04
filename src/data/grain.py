import json
import pandas as pd
import numpy as np
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import polynomial_kernel, linear_kernel, rbf_kernel
import math, re


# Read dataset
df_grain = pd.read_csv("./grain_machinery_data.csv")
# Pre-processing
df_grain.fillna({
    'Capacity (tons/hour)': 0,
    'Power Output (kW)': 0,
    'Price (INR)': 0,
    'Machine Name': '',
}, inplace=True)
df_grain = df_grain.drop_duplicates()


tfidf = TfidfVectorizer(stop_words="english")
tfidf_matrix = tfidf.fit_transform(df_grain["Machine Name"])

cosine_sim = polynomial_kernel(tfidf_matrix, tfidf_matrix)
indices = pd.Series(df_grain.index, index=df_grain['Machine Name']).drop_duplicates()

def to_dataframe(list1, df):
    return df.loc[list1]

def get_recommendation_1(machine_name, cosine_sim = cosine_sim):
    l1 = []
    possible_matches = [name for name in df_grain['Machine Name'] if re.search(machine_name, name, re.IGNORECASE)]
    machine_name = possible_matches[0]
    idx = indices[machine_name]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x:x[1], reverse=True)
    for i, score in sim_scores:
        # print(df_grain['Machine Name'].iloc[i])
        l1.append(i)
    return l1

def get_recommendation_2(df):                             # normalization + score_calculation + get recommendation
    df['Price (INR)'] = df['Price (INR)'] / math.pow(10, 6)
    df['Score'] = 0.3 * df['Capacity (tons/hour)'] + 0.5 * df['Power Output (kW)'] + 0.2 * df['Price (INR)']
    min_score = df['Score'].min()
    max_score = df['Score'].max()
    df['Score'] = (4 * (df['Score'] - min_score) / (max_score - min_score) + 1).round().astype(int) 
    sorted_df = df.sort_values(by = 'Score', ascending = False)
    sorted_df['Price (INR)'] = (sorted_df['Price (INR)'] * math.pow(10, 6)).astype(int)
    return sorted_df 
    
grain = "Rice"
l2 = get_recommendation_1(grain, cosine_sim)
new_df = to_dataframe(l2, df_grain)
new_df = new_df[new_df['Grain'] == grain][:10]
new_df = get_recommendation_2(new_df)
print(new_df)

# Define the path to save JSON in the src/data folder
output_data = new_df.to_dict(orient='records')
json_path = "machine.json"
# Save JSON file
with open(json_path, "w") as f:
    json.dump(output_data, f, indent=4)

# import os
# print("Current working directory:", os.getcwd())
