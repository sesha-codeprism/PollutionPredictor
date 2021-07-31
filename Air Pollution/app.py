#Importing dependencies
import numpy as np
import pandas as pd
from flask import Flask,render_template, jsonify, request, redirect, url_for
import pickle
import warnings
import itertools
import dateutil
import statsmodels.api as sm
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import seaborn as sns
from sklearn import metrics
from sklearn.preprocessing import MinMaxScaler

app = Flask(__name__)
app.config['DEBUG'] = True


#first route to homepage
@app.route('/')
def home():
    return render_template('index.html', aqi=None)

#second route does the predictions and creates table
@app.route('/predict', methods=['POST'])
def predict(prediction=None):
##### Inputs from HTML ######
    stn = request.form['Station Code']
    yr = request.form['Selected year']
    
    new_stn = int(stn)
    new_yr = int(yr)

    #feeding in the x value-years
    data=[[-1,2016],[-1,2017],[-1,2018],[-1,2019],[-1,2020],[-1,2021],[-1,2022],[-1,2023], [-1,new_yr]]
    scaler=MinMaxScaler(feature_range=(-1,1))
    scaler.fit(data)
    x=scaler.transform(data)
    newB=[103.59,-2.74]
    ypred=-(x.dot(newB))


    # print(probability)
    # print(prediction)
    return render_template('index.html', aqi=ypred[-1], )


if __name__ == '__main__':
	app.run()

