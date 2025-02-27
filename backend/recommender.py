import pandas as pd
import numpy as np
from sklearn.preprocessing import MinMaxScaler
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import chardet

features = {
    "Datasets/CoffeeMachineData.csv":{
            "numerical":['Capacity (Liters)','Power Output (kW)','Price (USD)','Brew Time (Minutes)','Weight (kg)'],
            "categorical":['Machine Name','Type','Ease of Use','Brew Quality'],
        },
    "Datasets/Fruit_Veg_Processing_Machines.csv": {
            "numerical":['Speed (kg/hr)', 'Power Input (kW)', 'Efficiency (%)','Price (USD)'],
            "categorical":['Machine Name', 'MType', 'MachineMaterial','Manufacturer'],
        },
    "Datasets/grain_machinery_data.csv":{
            "numerical":['Capacity (tons/hour)', 'Power Output (kW)', 'Price (USD)'],
            "categorical":['Grain', 'Machine Name', 'Grain Manufacturer'],
        },
    "Datasets/Ice_Cream_Makers.csv":{
            "numerical":['Noise Levels','Power(W)','Price (USD)'],
            "categorical":['Machine Name', 'Capacity', 'Batch Output'],
        },
    "Datasets/juice_makers.csv":
        {
            "numerical":[
                        'Motor Power (W)', 'Juicing Speed (RPM)', 'Noise Level (dB)',
                        'Customer Rating', 'Number of Reviews', 'Price (USD)',
                        ],
            "categorical":['Machine Name', 'Material','Type of Juicer'],
        },
    
}

# findr_col = {
#     "Datasets/CoffeeMachineData.csv": '',
#     "Datasets/Fruit_Veg_Processing_Machines.csv":'',
#     "Datasets/grain_machinery_data.csv": 'Machine Name',
#     "/Datasets/Ice_Cream_Makers.csv"
#     "Datasets/juice_makers.csv": 'Ease of Cleaning',
# }

datasets = ["Datasets/CoffeeMachineData.csv",
            "Datasets/Fruit_Veg_Processing_Machines.csv",
            "Datasets/grain_machinery_data.csv",
            "Datasets/Ice_Cream_Makers.csv",
            "Datasets/juice_makers.csv",]

def findr(file_path, user_input, findr_col, num_recomm=10):
    with open(file_path, 'rb') as f:
        result = chardet.detect(f.read())
        
    df = pd.read_csv(file_path,encoding=result['encoding'])
    categorical_cols = features[file_path]["categorical"]
    numerical_cols = features[file_path]["numerical"]
    df[categorical_cols] = df[categorical_cols].fillna('')
    df['combined_features'] = df[categorical_cols].apply(lambda x: ' '.join(x).lower(), axis=1)
    for col in numerical_cols:
        if col not in df.columns:
            raise ValueError(f"Numerical column '{col}' is missing in the dataset.")
    
    scaler = MinMaxScaler()
    df[numerical_cols] = scaler.fit_transform(df[numerical_cols])

    tfidf = TfidfVectorizer(stop_words='english')
    text_features = tfidf.fit_transform(df['combined_features'])

    combined_features_matrix = np.hstack([
        text_features.toarray(),
        df[numerical_cols].values
    ])

    cosine_sim = cosine_similarity(combined_features_matrix)
    column = findr_col
    matching_rows = df[df[column].str.contains(user_input, case=False, na=False)]

    if matching_rows.empty:
        return f"Machine '{user_input}' not found in the dataset."

    idx = matching_rows.index[0]
    sim_scores = list(enumerate(cosine_sim[idx]))
    sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)
    sim_indices = [i[0] for i in sim_scores[1:num_recomm+1]]

    df = pd.read_csv(file_path,encoding=result['encoding'])
    data = df.iloc[sim_indices]
    return data

# user_input = 'drip'
# findr_col = 'Type'
# num_recommendations = 15
# recommendations = findr(datasets[0], user_input, findr_col,num_recomm=num_recommendations) # incomplete - take datasets index from 
# print(type(recommendations))
# print(recommendations)