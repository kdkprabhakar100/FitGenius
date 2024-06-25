# %%
import numpy as np
import pandas as pd
from sklearn.preprocessing import OneHotEncoder
from sklearn.linear_model import LinearRegression
import os

# Load dataset
data_file_path = r'C:\Users\Acer\OneDrive\Desktop\FitGenius\Backend\dataset.csv'

# Check if the file exists
if not os.path.exists(data_file_path):
    raise FileNotFoundError(f"The file at path {data_file_path} does not exist.")

df = pd.read_csv(data_file_path)

# Display column names to verify
print("Columns in the dataset:", df.columns)

# Encoding categorical columns
encoder = OneHotEncoder(sparse=False, handle_unknown='ignore')
categorical_cols = df.select_dtypes('object').columns.tolist()
encoded_data = encoder.fit_transform(df[categorical_cols].fillna('N/A'))

# Create a DataFrame with the encoded columns
encoded_cols = list(encoder.get_feature_names_out(categorical_cols))
encoded_df = pd.DataFrame(encoded_data, columns=encoded_cols, index=df.index)

# Concatenate the original DataFrame with the encoded columns and drop the original categorical columns
df = pd.concat([df, encoded_df], axis=1).drop(columns=categorical_cols)

# Error function
def rmse(targets, predictions):
    return np.sqrt(np.mean(np.square(targets - predictions)))

# Create inputs and targets
input_columns = ['Gender', 'Age', 'Height', 'Weight', 'Bmi', 'Injury', 'Bmi_class_Normal weight', 
                 'Bmi_class_Obese', 'Bmi_class_Overweight', 'Bmi_class_Underweight', 'Goals_Maintain', 
                 'Goals_Weight gain', 'Goals_Weight loss', 'Current_fitness_level_Advance', 
                 'Current_fitness_level_Beginner', 'Current_fitness_level_Intermediate']

missing_cols = [col for col in input_columns if col not in df.columns]
if missing_cols:
    raise ValueError(f"Missing columns in the dataset: {missing_cols}")

inputs = df[input_columns]
targets = df['Intensity_level']

# Initialize and train the model
model = LinearRegression().fit(inputs, targets)

# Generating predictions
predictions = model.predict(inputs)
predicted_df = pd.DataFrame({
    'Actual': targets,
    'Predicted': np.ceil(predictions).astype(int)
})

print(predicted_df)

# Compute Loss to evaluate the model
loss = rmse(targets, predictions)
print('Loss:', loss)

# %%



