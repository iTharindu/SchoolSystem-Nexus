let mongoose = require('mongoose');

let timetableSchema = mongoose.Schema({
  class : {
    type : String,
    //required : true
  },
    monday_first: {
      type : String,
      required : true
    },
    monday_second: {
      type : String,
      required : true

    },
    monday_third: {
      type : String,
      required : true
      
    },
    monday_fourth: {
      type : String,
      required : true
      
    },
    monday_fifth: {
      type : String,
      required : true
    },
    monday_sixth: {
      type : String,
      required : true
      
    },
    monday_seventh: {
      type : String,
      required : true
    },
    monday_eighth: {
      type : String,
      required : true

  },
    tuesday_first: {
      type : String,
      required : true
    },
    tuesday_second: {
      type : String,
      required : true

    },
    tuesday_third: {
      type : String,
      required : true
      
    },
    tuesday_fourth: {
      type : String,
      required : true
      
    },
    tuesday_fifth: {
      type : String,
      required : true
    },
    tuesday_sixth: {
      type : String,
      required : true
      
    },
    tuesday_seventh: {
      type : String,
      required : true
    },
    tuesday_eighth: {
      type : String,
      required : true

  },

    wednesday_first: {
      type : String,
      required : true
    },
    wednesday_second: {
      type : String,
      required : true

    },
    wednesday_third: {
      type : String,
      required : true
      
    },
    wednesday_fourth: {
      type : String,
      required : true
      
    },
    wednesday_fifth: {
      type : String,
      required : true
    },
    wednesday_sixth: {
      type : String,
      required : true
      
    },
    wednesday_seventh: {
      type : String,
      required : true
    },
    wednesday_eighth: {
      type : String,
      required : true


  },

    thursday_first: {
      type : String,
      required : true
    },
    thursday_second: {
      type : String,
      required : true

    },
    thursday_third: {
      type : String,
      required : true
      
    },
    thursday_fourth: {
      type : String,
      required : true
      
    },
    thursday_fifth: {
      type : String,
      required : true
    },
    thursday_sixth: {
      type : String,
      required : true
      
    },
    thursday_seventh: {
      type : String,
      required : true
    },
    thursday_eighth: {
      type : String,
      required : true

    
  },
 
    friday_first: {
      type : String,
      required : true
    },
    friday_second: {
      type : String,
      required : true

    },
    friday_third: {
      type : String,
      required : true
      
    },
    friday_fourth: {
      type : String,
      required : true
      
    },
    friday_fifth: {
      type : String,
      required : true
    },
    friday_sixth: {
      type : String,
      required : true
      
    },
    friday_seventh: {
      type : String,
      required : true
    },
    friday_eighth: {
      type : String,
      required : true


  }

});

var Timetable = module.exports = mongoose.model('Timetable',timetableSchema);
