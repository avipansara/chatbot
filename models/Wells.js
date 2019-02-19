const mongoose = require('mongoose');
const {Schema} = mongoose;

const wellsSchema = new Schema({
    CurrentOperatorName: String,
    CurrentOperatorCity: String,
    LeaseName:String,
    WellNum: String,
    FieldName:String,
    CoutryName:String,
    StateName: String,
    SurfaceLatitude : String,
    SurfaceLongitude : String
});

mongoose.model('wells', wellsSchema);