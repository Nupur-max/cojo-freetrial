//import liraries
import React from 'react';
import { View, Text, TouchableOpacity,ActivityIndicator,Linking, TextInput, Button,KeyboardAvoidingView, Modal, Dimensions,Pressable, StyleSheet, Alert, SafeAreaView, Platform, TouchableWithoutFeedback } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import DatePicker from 'react-native-datepicker';
import { RadioButton } from 'react-native-paper';
import CheckBox from '@react-native-community/checkbox';
import { MaskedTextInput } from "react-native-mask-text";
import AsyncStorage from '@react-native-community/async-storage';
import { ParamsContext } from '../../params-context';
import { ConfigContext } from '../../config-Context';
import { DisplayContext } from '../../display-context';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LogListData } from '../../store/actions/loglistAction';
import { CreateLogbookData } from '../../store/actions/CLAction';
import { useSelector, useDispatch } from 'react-redux';
import { ThemeContext } from '../../theme-context';
import SsStyle from '../../styles/settingScreenStyle';
import { ProgressBar } from 'react-native-paper';
import BackupStyle from '../../styles/backupStyles';
import { PilotData } from '../../store/actions/pilotsAction';
import { BaseUrl } from '../../components/url.json';
import SQLite from 'react-native-sqlite-storage';
import { useIsFocused } from "@react-navigation/native";
import {trainingV,testV,commercialV} from '../../components/dummydropdown'
import DropDownPicker from 'react-native-dropdown-picker';


const prePopulateddb = SQLite.openDatabase(
    {
        name: 'autoflightlogdb.db',
        createFromLocation: 1,
        //location: 'www/autoflightlogdb.db',
    },
    () => {
        //alert('successfully executed');
    },
    error => {
        alert('db error');
    },
);

import { Logbook, ModalView } from '../../styles/styles';
import { ScrollView } from 'react-native-gesture-handler';

// create a component
const CreateLogbook = ({ navigation }) => {
   
    const isFocused = useIsFocused();

    const dataDispatcher = useDispatch();

    const getReduxDisplayData = useSelector(state => state.display.ActualI);


const CalcActualInstrument = (inputText) => {
    console.log(getReduxDisplayData.ActualI)
     if (getReduxDisplayData.ActualI === true) {
        var t1 = filghtTimeM
        var t2 = getReduxDisplayData.TimeofAi
        var t1parts = t1.split(':');    
        var t1cm=Number(t1parts[0])*60+Number(t1parts[1]);

        var t2parts = t2.split(':');    
        var t2cm=Number(t2parts[0])*60+Number(t2parts[1]);

        var hour =Math.floor((t1cm-t2cm)/60);  
        if (hour < 10) { hour = "0" + hour; }  
        var min=Math.floor((t1cm-t2cm)%60); 
        var m = (Math.round(min/15) * 15) % 60;
        if (m < 10) { m = "0" + m; } 
        setAi(hour+':'+m)
    }
}

React.useEffect(() => {
if (filghtTimeM) {
CalcActualInstrument()}}, [filghtTimeM, CalcActualInstrument]);

const day_editable = (dayTime) => {
      setSic_day(dayTime)
      setDayTime(dayTime)
      setP1_us_day(dayTime)
    var TotalFlightTime = filghtTimeM
    var DayTotalTime = dayTime
    var TotalFlightTimeparts = TotalFlightTime.split(':');    
    var TotalFlightTimecm=Number(TotalFlightTimeparts[0])*60+Number(TotalFlightTimeparts[1]);
    var DayTotalTimeparts = DayTotalTime.split(':');    
    var DayTotalTimecm=Number(DayTotalTimeparts[0])*60+Number(DayTotalTimeparts[1]);

    var Nighthour = Math.floor((TotalFlightTimecm-DayTotalTimecm)/60);  
    if (Nighthour < 10) { Nighthour = "0" + Nighthour; }  
    var Nightmin=Math.floor((TotalFlightTimecm-DayTotalTimecm)%60); 
    //var m = (Math.round(min/15) * 15) % 60;
    if (Nightmin < 10) { Nightmin = "0" + Nightmin; } 
    if(isNaN(Nighthour)){Nighthour="00"}
    if(isNaN(Nightmin)){Nightmin="00"}
    setNightTime(Nighthour+':'+Nightmin)
    setSic_night(Nighthour+':'+Nightmin)
    setP1_us_night(Nighthour+':'+Nightmin)
}

const night_editable = (nightTime) => {
       setSic_night(nightTime)
       setNightTime(nightTime)
       setP1_us_night(nightTime)
    var TotalFlightTime1 = filghtTimeM
    var NightTotalTime = nightTime
    var TotalFlightTime1parts = TotalFlightTime1.split(':');    
    var TotalFlightTime1cm=Number(TotalFlightTime1parts[0])*60+Number(TotalFlightTime1parts[1]);
    
    var NightTotalTimeparts = NightTotalTime.split(':');    
    var NightTotalTimecm=Number(NightTotalTimeparts[0])*60+Number(NightTotalTimeparts[1]);

    var DayHour = Math.floor((TotalFlightTime1cm-NightTotalTimecm)/60);  
    if (DayHour < 10) { DayHour = "0" + DayHour; }  
    var Daymin=Math.floor((TotalFlightTime1cm-NightTotalTimecm)%60);
    if (Daymin < 10) { Daymin = "0" + Daymin; } 
    if(isNaN(DayHour)){DayHour="00"}
    if(isNaN(Daymin)){Daymin="00"}
    setDayTime(DayHour+':'+Daymin)
    setSic_day(DayHour+':'+Daymin)
    setP1_us_day(DayHour+':'+Daymin)
}


const SICday_editable = (inputText) => {
    setSic_day(inputText)
    setDayTime(inputText)
    setP1_us_day(inputText)
  var TotalFlightTimeSIC = filghtTimeM
  var DayTotalTimeSIC = sic_day
  var TotalFlightTimepartsSIC = TotalFlightTimeSIC.split(':');    
  var TotalFlightTimecmSIC=Number(TotalFlightTimepartsSIC[0])*60+Number(TotalFlightTimepartsSIC[1]);
  var DayTotalTimepartsSIC = sic_day!==undefined?DayTotalTimeSIC.split(':'): null;    
  var DayTotalTimecmSIC=sic_day!==undefined? Number(DayTotalTimepartsSIC[0])*60+Number(DayTotalTimepartsSIC[1]) : null;

  var NighthourSIC = Math.floor((TotalFlightTimecmSIC-DayTotalTimecmSIC)/60);  
  if (NighthourSIC < 10) { NighthourSIC = "0" + NighthourSIC; }  
  var NightminSIC=Math.floor((TotalFlightTimecmSIC-DayTotalTimecmSIC)%60); 
  if (NightminSIC < 10) { NightminSIC = "0" + NightminSIC; } 
  setSic_night(NighthourSIC+':'+NightminSIC)
  setNightTime(NighthourSIC+':'+NightminSIC)
  setP1_us_night(NighthourSIC+':'+NightminSIC)
}

const SICnight_editable = (inputText) => {
     setSic_night(inputText)
     setNightTime(inputText)
     setP1_us_night(inputText)
  var TotalFlightTimeSIC1 = filghtTimeM
  var NightTotalTimeSIC = sic_night
  var TotalFlightTime1partsSIC = TotalFlightTimeSIC1.split(':');    
  var TotalFlightTime1cmSIC=Number(TotalFlightTime1partsSIC[0])*60+Number(TotalFlightTime1partsSIC[1]);
  
  var NightTotalTimepartsSIC = NightTotalTimeSIC.split(':');    
  var NightTotalTimecmSIC=Number(NightTotalTimepartsSIC[0])*60+Number(NightTotalTimepartsSIC[1]);

  var DayHourSIC =Math.floor((TotalFlightTime1cmSIC-NightTotalTimecmSIC)/60);  
  if (DayHourSIC < 10) { DayHourSIC = "0" + DayHourSIC; }  
  var DayminSIC=Math.floor((TotalFlightTime1cmSIC-NightTotalTimecmSIC)%60); 
  if (DayminSIC < 10) { DayminSIC = "0" + DayminSIC; } 
  setSic_day(DayHourSIC+':'+DayminSIC)
  setDayTime(DayHourSIC+':'+DayminSIC)
  setP1_us_day(DayHourSIC+':'+DayminSIC)
}

// Context Global variables
    const [Destparams] = React.useContext(ParamsContext);
    const [Peopleparams] = React.useContext(ParamsContext);
    const [Approachparams] = React.useContext(ParamsContext);

    const [params] = React.useContext(ParamsContext);
    const [Listparams] = React.useContext(ParamsContext);

    const [ConfigParams] = React.useContext(ParamsContext);

    //custom input fields start

    const [textValue, setTextValue] = React.useState('');
    const [numInputs, setNumInputs] = React.useState(1);
    const refInputs = React.useRef([textValue]);
    const [flightType,setFlightType] = React.useState('');

    const [open, setOpen] = React.useState(false);
    const [training, setTraining] = React.useState([]);
    const [trainingValue, setTrainingValue] = React.useState(trainingV);
    const [test, setTest] = React.useState([]);
    const [testValue, setTestValue] = React.useState(testV);
    const [commercial, setCommercial] = React.useState([]); 
    const [commercialValue, setCommercialValue] = React.useState(commercialV);

    const [ddvalue,setDDValue]= React.useState([]);

    //custom input fields end

    const [chocksOff, setChocksOff] = React.useState('');
    const [takeOff, setTakeOff] = React.useState('');
    const [landing, setLanding] = React.useState('');
    const [chocksOn, setChocksOn] = React.useState('');

    //time section
    const [totalTime, setTotalTime] = React.useState('');
    const [day, setDay] = React.useState('');
    const [night, setNight] = React.useState('');
    const [filghtTimeM, setfilghtTimeM] = React.useState('')
    const [dayTime, setDayTime] = React.useState('')
    const [nightTime, setNightTime] = React.useState('')
    const [ai, setAi] = React.useState('');
    const [dual_day, setDual_day] = React.useState('');
    const [dual_night, setDual_night] = React.useState('');
    const [p1_us_day, setP1_us_day] = React.useState('');
    const [p1_us_night, setP1_us_night] = React.useState('');
    const [p1_ut_day, setP1_ut_day] = React.useState('');
    const [p1_ut_night, setP1_ut_night] = React.useState('');
    const [pic_day, setPic_day] = React.useState('');
    const [pic_night, setPic_night] = React.useState('');
    const [si, setSi] = React.useState('');
    const [sic_day, setSic_day] = React.useState();
    const [sic_night, setSic_night] = React.useState('');
    const [xc_day, setXc_day] = React.useState('');
    const [xc_night, setXc_night] = React.useState('');
    const [xc_day_leg, setXc_dayLeg] = React.useState('');
    const [xc_night_leg, setXc_nightLeg] = React.useState('');

    //RosterData
    const [userRosterId,setUserRosterId] = React.useState('');
    const [userRosterPwd, setUserRosterPwd]= React.useState('');
    const [userRosterAirlineType, setUserAirlineType]= React.useState('');
    const [dataFetched, setDataFetched]=React.useState(false);
    const [progressValue, setProgressValue] = React.useState('')
    const [offset, setOffset] = React.useState(1)
    const [pilotsFetched, setPilotsFetched] = React.useState(false)
    const [pilotListProgress, setPilotListProgress] = React.useState('');
    const [date, setDate] = React.useState(new Date());
    const [mode, setMode] = React.useState('date');
    const [show, setShow] = React.useState(false);
    const [fr, setFr] = React.useState('ifr');
    const [stl, setStl] = React.useState(false);
    const [df, setDf] = React.useState([]);
    const [aircraft_name, setAircraft_name] = React.useState('')
    const [flight, setFlight] = React.useState('')
    const [aircraftId, setAircraftId] = React.useState('') 
    const [route, setRoute] = React.useState('')
    const [remark, setRemark] = React.useState('')
    const [fromDate, setFromDate] = React.useState('')
    const [toDate, setToDate] = React.useState('')

    //landing
    const [dayLanding, setDayLanding] = React.useState('');
    const [day_to, setDay_to] = React.useState('');
    const [nightLanding, setNightLanding] = React.useState('');
    const [night_to, setNight_to] = React.useState('');

    const [modalVisible, setModalVisible] = React.useState(false);
    const [FlightmodalVisible, setFlightModalVisible] = React.useState(false);
    const [TimemodalVisible, setTimeModalVisible] = React.useState(false);
    const [LandingmodalVisible, setLandingModalVisible] = React.useState(false);
    const [ApproachmodalVisible, setApproachModalVisible] = React.useState(false)
    const [FlightAlertmodalVisible, setFlightAlertModalVisible] = React.useState(false)
    const [TimeAlertmodalVisible, setTimeAlertModalVisible] = React.useState(false);
    const [AppAlertmodalVisible, setAppAlertModalVisible] = React.useState(false);
    const [lndgAlertmodalVisible, setlndgAlertModalVisible] = React.useState(false);
    const [RostermodalVisible, setRosterModalVisible] = React.useState(false);
    const [importModal,setImportModal]= React.useState(false);

    //params for destinations
    const [from, setFrom] = React.useState('')
    const [to, setTo] = React.useState('')
    const [fromLatdest, setFromLatdest] = React.useState('')
    const [toLatdest, setToLatdest] = React.useState('')
    const [fromLongdest, setFromLongdest] = React.useState('')
    const [toLongdest, setToLongdest] = React.useState('')

    const [fromAirportid, setFromAirportId] = React.useState('')
    const [fromIdent, setFromIdent] = React.useState('')
    const [fromAirportname, setFromAirportName] = React.useState('')
    const [fromType, setFromType] = React.useState('')
    const [fromCity1, setFromCity1] = React.useState('')
    const [fromCity2, setFromCity2] = React.useState('')
    const [fromCountry, setFromCountry] = React.useState('')
    const [fromLatitude, setFromLat] = React.useState('')
    const [fromLongitude, setFromLong] = React.useState('')
    const [fromElevation, setFromElevation] = React.useState('')
    const [fromTimeZone, setFromTimeZone] = React.useState('')
    const [fromDst, setFromDst] = React.useState('')
    const [fromDstStatus, setFromDstStatus] = React.useState('')
    const [fromDst_startDate, setFromDst_startDate] = React.useState('')
    const [fromDst_endDate, setFromDst_endDate] = React.useState('')
    const [fromICAO, setFromICAO] = React.useState('')
    const [fromIATA, setFromIATA] = React.useState('')
    const [fromSource, setFromSource] = React.useState('')
    const [distance, setDistance] = React.useState('')

    const [toAirportid, setToAirportId] = React.useState('')
    const [toIdent, setToIdent] = React.useState('')
    const [toAirportname, setToAirportName] = React.useState('')
    const [toType, setToType] = React.useState('')
    const [toCity1, setToCity1] = React.useState('')
    const [toCity2, setToCity2] = React.useState('')
    const [toCountry, setToCountry] = React.useState('')
    const [toLatitude, setToLat] = React.useState('')
    const [toLongitude, setToLong] = React.useState('')
    const [toElevation, setToElevation] = React.useState('')
    const [toTimeZone, setToTimeZone] = React.useState('')
    const [toDst, setToDst] = React.useState('')
    const [toDstStatus, setToDstStatus] = React.useState('')
    const [toDst_startDate, setToDst_startDate] = React.useState('')
    const [toDst_endDate, setToDst_endDate] = React.useState('')
    const [toICAO, setToICAO] = React.useState('')
    const [toIATA, setToIATA] = React.useState('')
    const [toSource, setToSource] = React.useState('')

    //params constants
    const [pic_p1, setPic_p1] = React.useState('')
    const [sic_p2, setSic_p2] = React.useState('')
    const [approach1, setApproach1] = React.useState('')

    //Hidden fields //params
    const [instructor, setInstructor] = React.useState('')
    const [reliefCrew1, setReliefCrew1] = React.useState('')
    const [reliefCrew2, setReliefCrew2] = React.useState('')
    const [reliefCrew3, setReliefCrew3] = React.useState('')
    const [reliefCrew4, setReliefCrew4] = React.useState('')
    const [student, setStudent] = React.useState('')
    const [approach2, setApproach2] = React.useState('')

    //Hidden Fields
    const [instructional, setInstructional] = React.useState('')
    const [autoLanding, setAutoLanding] = React.useState('')
    const [fullStop, setFullStop] = React.useState('')
    const [touchGo, setTouchGo] = React.useState('')
    const [waterLanding, setWaterLanding] = React.useState('')
    const [water_to, setWater_to] = React.useState('')

    //from listingLogbook
    const [listId, setListId] = React.useState('')
    const [listDate, setListDate] = React.useState('')
    const [listFlight, setListFlight] = React.useState('')
    const [listAircraftType, setListAircraftType] = React.useState('')
    const [listAircraftId, setListAircraftId] = React.useState('')
    const [listFrom, setListFrom] = React.useState('')
    const [listTo, setListTo] = React.useState('')
    const [listChocksOff, setListChocksOff] = React.useState('')
    const [listTakeOff, setListTakeOff] = React.useState('')
    const [listLanding, setListLanding] = React.useState('')
    const [listChocksOn, setListChocksOn] = React.useState('')
    const [listRoute, setListRoute] = React.useState('')
    const [listInstructor, setListInstructor] = React.useState('')
    const [listP1, setListP1] = React.useState('')
    const [listRc1, setListRc1] = React.useState('')
    const [listRc2, setListRc2] = React.useState('')
    const [listRc3, setListRc3] = React.useState('')
    const [listRc4, setListRc4] = React.useState('')
    const [listP2, setListP2] = React.useState('')
    const [listStudent, setListStudent] = React.useState('')
    const [listTotalTime, setListTotalTime] = React.useState('')
    const [listDay, setListDay] = React.useState('')
    const [listNight, setListNight] = React.useState('')
    const [listAi, setListAi] = React.useState('')
    const [listDualDay, setListDualDay] = React.useState('')
    const [listDualNight, setListDualNight] = React.useState('')
    const [listInstructional, setListInstructional] = React.useState('')
    const [listFr, setListFr] = React.useState('')
    const [listP1UsDay, setListP1UsDay] = React.useState('')
    const [listP1UsNight, setListP1UsNight] = React.useState('')
    const [listP1UtDay, setListP1UtDay] = React.useState('')
    const [listP1UtNight, setListP1UtNight] = React.useState('')
    const [listPicDay, setListPicDay] = React.useState('')
    const [listPicNight, setListPicNight] = React.useState('')
    const [listStl, setListStl] = React.useState('')
    const [listSi, setListSi] = React.useState('')
    const [listSicDay, setListSicDay] = React.useState('')
    const [listSicNight, setListSicNight] = React.useState('')
    const [listXcDay, setListXcDay] = React.useState('')
    const [listXcNight, setListXcNight] = React.useState('')
    const [listXcDayLegs, setListXcDayLegs] = React.useState('')
    const [listXcNightLegs, setListXcNightLegs] = React.useState('')
    const [listAutoLanding, setListAutoLanding] = React.useState('')
    const [listDayLanding, setListDayLanding] = React.useState('')
    const [listDayTO, setListDayTO] = React.useState('')
    const [listFullStop, setListFullStop] = React.useState('')
    const [listNightLanding, setListNightLanding] = React.useState('')
    const [listNightTO, setListNightTO] = React.useState('')
    const [listTouchGo, setListTouchGo] = React.useState('')
    const [listWaterLanding, setListWaterLanding] = React.useState('')
    const [listWaterTO, setListWaterTO] = React.useState('')
    const [listApproach1, setListApproach1] = React.useState('')
    const [listApproach2, setListApproach2] = React.useState('')
    const [listRemark, setListRemark] = React.useState('')

    //from roaster (logbook-list)
    const [rosterId, setRosterId] = React.useState('');
    const dynamicRosterdate = (params.RoasterDate) ? new Date (params.RoasterDate) : new Date()
    const [rosterDate, setRosterDate] = React.useState(dynamicRosterdate);
    const [rosterFrom, setRosterFrom] = React.useState('')
    const [rosterChocksOff, setRosterChocksOff] = React.useState('')
    const [savedChocksOff, setSavedChocksOff] = React.useState('')
    const [rosterTo, setRosterTo] = React.useState('')
    const [rosterChocksOn, setRosterChocksOn] = React.useState('')
    const [rosterAType, setRosterAType] = React.useState('')
    const [rosterAId, setRosterAId] = React.useState('')
    //const [rosterTotalTime, setRosterTotalTime] = React.useState('')
    const [rosterNamePic, setRosterNamePic] = React.useState('')
    const [rosterNameSic, setRosterNameSic] = React.useState('')
    const [rosterDayLand, setRosterDayLand] = React.useState('')
    const [rosterNightLand, setRosterNightLand] = React.useState('')
    const [rosterDayTakeOff, setRosterDayTakeOff] = React.useState('')
    const [rosterNightTakeOff, setRosterNightTakeOff] = React.useState('')
    const [rosterToLat, setRosterToLat] = React.useState('')
    const [rosterFromLat, setRosterFromLat] = React.useState('')
    const [rosterFromParams, setRosterFromParams] = React.useState('')

    //for simu
    const [St, setSt] = React.useState('')
    const [location, setLocation] = React.useState('')
    const [Sim_exercise, setSim_exercise] = React.useState('')
    const [totalTo_time, setTotalTo_time] = React.useState('')
    const [pfHours, setPfHours] = React.useState('')
    const [pmHours, setPmHours] = React.useState('')
    const [sf, setSf] = React.useState('')
    const [networkConnection, setNetworkConnection] = React.useState('')

    //dynamic fields

    const [textInput,setTextInput] = React.useState([]);
    const [inputData, setInputData] = React.useState([]);
    const [timeTextInput,setTimeTextInput] = React.useState([]);
    const [timeInputData, setTimeInputData] = React.useState([]);
    const [LandingTextInput,setLandingTextInput] = React.useState([]);
    const [LandingInputData, setLandingInputData] = React.useState([]);
    const [ApproachTextInput,setApproachTextInput] = React.useState([]);
    const [ApproachInputData, setApproachInputData] = React.useState([]);
    const [FilterCustom, setFilterCustom] = React.useState('') 
    const [TimeFilterCustom, setTimeFilterCustom] = React.useState('')
    const [LandingFilterCustom, setLandingFilterCustom] = React.useState('')
    const [ApproachFilterCustom, setApproachFilterCustom] = React.useState('')

    //function to remove TextInput dynamically
    const removeTextInput = (index) => {
    inputData.splice(inputData, index);
    textInput.splice(textInput, index);
    }

    const addTextInput = (index) => {
    if (!FilterCustom.trim()) {
    alert('Custom Field is required');
    setFlightModalVisible(!FlightmodalVisible)
    }
    else{
    let textInput1 = textInput;
    textInput1.push(<View style={Logbook.fieldWithoutBottom}>
        <View style={Logbook.fields}>
            <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}>{FilterCustom}</Text>
            <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                <TouchableOpacity onPress={()=>(navigation.navigate('People'))}>
                    <MaterialCommunityIcons
                        name="chevron-right" color={'#256173'} size={25} style={{ lineHeight: 35 }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>removeTextInput(index)}>
                    <MaterialCommunityIcons
                        name="alpha-x-circle-outline" color={'red'} size={15} style={{ lineHeight: 35 }} />
                </TouchableOpacity>
            </View>
        </View>
    </View>);
   setTextInput(textInput1);
   setFlightModalVisible(false);
    }
  }

//function to add text from TextInputs into single array

//custom fields for time
const removeTextInputTime = (timeIndex) => {
    timeInputData.splice(timeInputData, timeIndex);
    timeTextInput.splice(timeTextInput, timeIndex);
  }

    const TimeInputText = (timeIndex) => {
    if (!TimeFilterCustom.trim()) {
    alert('Custom Field is required');
    setTimeModalVisible(!TimemodalVisible)
    }
    else{
    let timeTextInput1 = timeTextInput;
    timeTextInput1.push(<View style={Logbook.fieldWithoutBottom}>
        <View style={Logbook.fields}>
            <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}>{TimeFilterCustom}</Text>
            <MaskedTextInput
                mask='99:99'
                value={params.RoasterP2 === 'Self' && sic_day}
                onChangeText={inputText => {SICday_editable(inputText)}}
                keyboardType="numeric"
                placeholder="hh:mm"
            />
        </View>
        <TouchableOpacity onPress={()=>removeTextInputTime(timeIndex)}>
            <MaterialCommunityIcons
            name="alpha-x-circle-outline" color={'red'} size={15} style={{ lineHeight: 45 }} />
        </TouchableOpacity>
    </View>);
   setTimeTextInput(timeTextInput1);
   setTimeModalVisible(false);
    }
  }
//custom fields for time

//Custom fields for Landing

const removelandingInputTime = (LandingIndex) => {
    LandingInputData.splice(LandingInputData, LandingIndex);
    LandingTextInput.splice(LandingTextInput, LandingIndex);
  }

    const LandingInputText = (LandingIndex) => {
    if (!LandingFilterCustom.trim()) {
    alert('Custom Field is required');
    setLandingModalVisible(!LandingmodalVisible)
    }
    else{
    let LandingTextInput1 = LandingTextInput;
    LandingTextInput1.push(<View style={Logbook.fieldWithoutBottom}>
        <View style={Logbook.fields}>
            <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}>{LandingFilterCustom}</Text>
            <TextInput
                placeholder='Please Enter Number'
                placeholderTextColor='grey'
                value={dayLanding.toString()}
                onChangeText={(inputText) => setDayLanding(inputText)}
                style={{ marginTop: -5 }} />
        </View>
        <TouchableOpacity onPress={()=>removelandingInputTime(LandingIndex)}>
        <MaterialCommunityIcons
        name="alpha-x-circle-outline" color={'red'} size={15} style={{ lineHeight: 35 }} />
        </TouchableOpacity>
    </View>);
   setLandingTextInput(LandingTextInput1);
   setLandingModalVisible(false);
    }
  }

//Custom fields for Landing

//Custom fields for Approaches

React.useEffect(() => {
    GetUserDetails()
    }, []);
  
    const GetUserDetails = async () => {
      let user = await AsyncStorage.getItem('userdetails');
      user = JSON.parse(user);
      let temData = [];
      prePopulateddb.transaction(tx => {
        tx.executeSql('SELECT roster_id,roster_pwd,airline_type FROM userProfileData Where user_id = "' + user.id + '"', [], (tx, result) => {
          for (let i = 0; i <= result.rows.length; i++) {
            temData.push({
              roster_id: result.rows.item(i).roster_id,
              roster_pwd: result.rows.item(i).roster_pwd,
              airline_type: result.rows.item(i).airline_type,
            });
            setUserRosterId(result.rows.item(i).roster_id)
            setUserRosterPwd(result.rows.item(i).roster_pwd)
            setUserAirlineType(result.rows.item(i).airline_type)
           }
          
          });
      });
    }

const Roaster = async() => {
    setProgressValue(0.3)
    dataDispatcher(LogListData({data: [], inProgress:false}))
    setDataFetched(true)
    let user = await AsyncStorage.getItem('userdetails');
    user = JSON.parse(user);
  
      await fetch(BaseUrl+'roasterImport',{
        method : 'POST',
        headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "user_id": user.id,
          "user": userRosterId, 
          "pass": userRosterPwd,
          "airline_type": userRosterAirlineType,
          "from": fromDate,
          "to": toDate,
      })
    }).then(res => res.json())
    .then(resData => {
  
      for(let i=0; i<resData.data.length; i++) 
       {
           const AircraftReg = resData.data[i].Aircraft_Reg
           const AircraftType = resData.data[i].Aircraft_type
           const chocksOn = resData.data[i].Arrival_time
           const date = resData.data[i].Dept_date
           const newDateFormat = resData.data[i].Dept_date
           const fromCity = resData.data[i].Dept_place_ICAO
           const toCity = resData.data[i].Arrival_place_ICAO
           const chocksOff = resData.data[i].Dept_time
           const dayland = resData.data[i].Lands_Day
           const nightLand = resData.data[i].Lands_Night
           const SelfField = resData.data[i].Name_PIC
           const dayTO = resData.data[i].TkkOff_Day
           const nightTO = resData.data[i].TkkOff_Night
           const RosterFromLat = resData.data[i].RosterFromLat
           const RosterFromLong = resData.data[i].RosterFromLong
           const RosterToLat = resData.data[i].RosterToLat
           const RosterToLong = resData.data[i].RosterToLong
           const Pilot_Pic = resData.data[i].Pilot_function_PIC
           const Pilot_Copilot = resData.data[i].Pilot_function_Copilot
           const Pilot_Instructor = resData.data[i].Pilot_function_Instructor
  
          const RealAircraftType = AircraftType === '320' || AircraftType === '321' ? 'A-'+ AircraftType : AircraftType;
  
          let text = date;
          const myArray = text.split("-");
          const day =  myArray[2]+ myArray[1] + myArray[0] 
  
           prePopulateddb.transaction((tx) => {
            if (Pilot_Pic !== ''){
            //Alert.alert('Pilot_Pic')
            tx.executeSql(
             'INSERT INTO logbook (tag,user_id,aircraftReg,aircraftType,to_nameICAO,onTime,date,from_nameICAO,offTime,dayLanding,nightLanding,p1,p2,dayTO,nightTO,from_lat,from_long,to_lat,to_long,orderedDate) VALUES ("roster","'+user.id+'","'+AircraftReg+'","'+RealAircraftType+'","'+toCity+'","'+chocksOn+'","'+date+'","'+fromCity+'","'+chocksOff+'","'+dayland+'","'+nightLand+'","'+SelfField+'","","'+dayTO+'","'+nightTO+'","'+RosterFromLat+'","'+RosterFromLong+'","'+RosterToLat+'","'+RosterToLong+'","'+day+'")', 
            );
            }
            else if (Pilot_Copilot !== '') {
              //Alert.alert ('Pilot_Copilot')
              tx.executeSql(
                'INSERT INTO logbook (tag,user_id,aircraftReg,aircraftType,to_nameICAO,onTime,date,from_nameICAO,offTime,dayLanding,nightLanding,p1,p2,dayTO,nightTO,from_lat,from_long,to_lat,to_long,orderedDate) VALUES ("roster","'+user.id+'","'+AircraftReg+'","'+RealAircraftType+'","'+toCity+'","'+chocksOn+'","'+date+'","'+fromCity+'","'+chocksOff+'","'+dayland+'","'+nightLand+'","","'+SelfField+'","'+dayTO+'","'+nightTO+'","'+RosterFromLat+'","'+RosterFromLong+'","'+RosterToLat+'","'+RosterToLong+'","'+day+'")', 
               );
            }
            else if (Pilot_Instructor !== ''){
              //Alert.alert ('Pilot_Instructor')
              tx.executeSql(
                'INSERT INTO logbook (tag,user_id,aircraftReg,aircraftType,to_nameICAO,onTime,date,from_nameICAO,offTime,dayLanding,nightLanding,p1,p2,dayTO,nightTO,from_lat,from_long,to_lat,to_long,orderedDate) VALUES ("roster","'+user.id+'","'+AircraftReg+'","'+RealAircraftType+'","'+toCity+'","'+chocksOn+'","'+date+'","'+fromCity+'","'+chocksOff+'","'+dayland+'","'+nightLand+'","'+SelfField+'","","'+dayTO+'","'+nightTO+'","'+RosterFromLat+'","'+RosterFromLong+'","'+RosterToLat+'","'+RosterToLong+'","'+day+'")', 
               );
            }
  
            if(resData.data.length>10){
              setProgressValue(0.5)
            }
  
            if((i+1) == resData.data.length){
            //selection from table logbook
              let RostertemData = [];
              prePopulateddb.transaction(tx => {
              tx.executeSql('SELECT id,tag,aircraftType,aircraftReg,user_id,date,from_nameICAO,to_nameICAO,offTime,onTime,from_lat,from_long,to_lat,to_long,p1,p2,dayLanding,nightLanding,dayTO,nightTO from logbook WHERE user_id = "'+user.id+'" AND tag ="roster" ORDER BY orderedDate DESC', [], (tx, result) => {
                  setOffset(offset + 10);
                    for (let j = 0; j < result.rows.length; j++) {
                        RostertemData.push({
                          id : result.rows.item(j).id,
                          tag : result.rows.item(j).tag,
                          aircraftType : result.rows.item(j).aircraftType,
                          aircraftReg : result.rows.item(j).aircraftReg,
                          user_id: result.rows.item(j).user_id,
                          date: result.rows.item(j).date,
                          from : result.rows.item(j).from_nameICAO, //add here
                          to : result.rows.item(j).to_nameICAO,
                          chocksOffTime : result.rows.item(j).offTime, 
                          chocksOnTime : result.rows.item(j).onTime,
                          from_lat : result.rows.item(j).from_lat,
                          from_long : result.rows.item(j).from_long,
                          to_lat : result.rows.item(j).to_lat,
                          to_long : result.rows.item(j).to_long,
                          p1 : result.rows.item(j).p1,
                          p2 : result.rows.item(j).p2,
                          dayLanding : result.rows.item(j).dayLanding,
                          nightLanding : result.rows.item(j).nightLanding,
                          dayTO : result.rows.item(j).dayTO,
                          nightTO : result.rows.item(j).nightTO,
                      });
                      setProgressValue(1)
                      dataDispatcher(LogListData({data: RostertemData, inProgress:false}))
                      let jPos = j+1
                      if(jPos == result.rows.length){
                        Alert.alert("Message",'Data fetched successfully');
                        setDataFetched(false)
                        setRosterModalVisible(false)
                        return false;
                      }
                  }
                });
            });
           }
        //Select Query end
       });
      }
  
    }).catch((error) => {
      alert('Credentials incorrect',error)
      setModalVisible(false)
    });
  }

const importPilotList = async() => {
    setImportModal(true);
    setModalVisible(false);
    setPilotListProgress(0.3)
    setPilotsFetched(true)
    await fetch(BaseUrl+'fetch_pilots',{
      method : 'POST',
      headers:{
          'Accept': 'application/json',
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "airline": userRosterAirlineType,                  
   })
  }).then(res => res.json())
  .then(resData => {

  if(resData.data.length>100){
    setPilotListProgress(0.5)
  }
  if(resData.data.length>1000){
    setPilotListProgress(0.7)
  }
  
     for(let k=0; k < resData.data.length; k++) 
   {
      const Airline =resData.data[k].Airline
      const EGCA_Registration_No =resData.data[k].EGCA_Registration_No
      const Name =resData.data[k].Name
      const Pilotid =resData.data[k].id
       
      prePopulateddb.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO pilots (Airline,Egca_reg_no,Name,pilotId,selectedAirline)VALUES("'+Airline+'","'+EGCA_Registration_No+'","'+Name+'","'+Pilotid+'","'+userRosterAirlineType+'")',
        );
        if((k+1) == resData.data.length){
            let PilotData1 = [];
            prePopulateddb.transaction(tx => {
            tx.executeSql('SELECT * from pilots WHERE Airline = "'+userRosterAirlineType+'" limit 10 ', [], (tx, pilotresult) => {
                if (pilotresult.rows.length > 0) {
                }
                for (let l = 0; l < pilotresult.rows.length; l++) {
                
                  PilotData1.push({
                        id :pilotresult.rows.item(l).id,
                        Airline :pilotresult.rows.item(l).Airline,
                        Egca_reg_no :pilotresult.rows.item(l).Egca_reg_no,
                        Name :pilotresult.rows.item(l).Name,
                        pilotId :pilotresult.rows.item(l).pilotId,
                        
                    });
                  
                    dataDispatcher(PilotData({data: PilotData1}))
                    let lPos = l+1
                    if(lPos == pilotresult.rows.length){
                      setPilotListProgress(1)
                      Alert.alert("Message",'Pilot List imported successfully');
                      setPilotsFetched(false)
                      setImportModal(false)
                      return false;
                    }
                }
              });
          });
        }
        
      })
      
   }

}).catch((error) => {
    alert (error);
    setPilotsFetched (true);
  });
}

const removeApproachInputTime = (ApproachIndex) => {
    ApproachInputData.splice(ApproachInputData, ApproachIndex);
    ApproachTextInput.splice(ApproachTextInput, ApproachIndex);
  }

    const ApproachInputText = (ApproachIndex) => {
    if (!ApproachFilterCustom.trim()) {
    alert('Custom Field is required');
    setApproachModalVisible(!ApproachmodalVisible)
    }
    else{
    let ApproachTextInput1 = ApproachTextInput;
    ApproachTextInput1.push(<View style={Logbook.fieldWithoutBottom}>
        <View style={Logbook.fields}>
            <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}>{ApproachFilterCustom}</Text>
            <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                {/* <Text style={{ paddingTop: 10 }}>{approach1}</Text> */}
                <Text style={{ paddingTop: 10 }}>{Approach1}</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Approach')}>
                    <MaterialCommunityIcons
                        name="chevron-right" color={'#256173'} size={25} style={{ lineHeight: 35 }} />
                </TouchableOpacity>
            </View>
        </View>
        <TouchableOpacity onPress={()=>removeApproachInputTime(ApproachIndex)}>
        <MaterialCommunityIcons
        name="alpha-x-circle-outline" color={'red'} size={15} style={{ lineHeight: 35 }} />
        </TouchableOpacity>
    </View>);
   setApproachTextInput(ApproachTextInput1);
   setApproachModalVisible(false);
    }
  }

//Custom fields for Approaches
//function to console the output

    const { dark, theme, toggle } = React.useContext(ThemeContext);

    const selfControl = () => {
        if(rosterAId!="SIMU" || rosterNamePic==='' || rosterNameSic==='')
        if (rosterNamePic === rosterNameSic) {
            alert('P2 cannot be equal to p1,please check role')
            setRosterNameSic('')
        }
    }
    React.useEffect(() => {
       if (rosterNamePic !== '' || rosterNameSic !== '') {
        selfControl()
       }
    }, [rosterNamePic,rosterNameSic]);


    //from configuration
    const [f, setF] = React.useState(true)


    //for configuration
    const [config, setConfig] = React.useState(false);

    const { datee, Dateform, DateFormat, role } = React.useContext(DisplayContext);
   
    dataDispatcher(CreateLogbookData({AircraftType: rosterAType, FromICAO: rosterFrom, toICAO: rosterTo}))  // data dispatching to set aircraft screen

    React.useEffect(() => {
        if (ConfigParams.childParam) {
            setF(ConfigParams.itemRoleWise)
    }
    }, [ConfigParams]);

    React.useEffect(() => {
        setAircraft_name(params.logBookAirType)
    }, [params]);


    React.useEffect(() => {
            setFromAirportId(params.FromItemId)
            setFromIdent(params.FromItemCode)
            setFromAirportName(params.FromItemName)
            setFromType(params.Fromitemtype)
            setFromCity1(params.FromCity1)
            setFromCity2(params.FromCity2)
            setFromCountry(params.FromCountry)
            setFromLat(params.RoasterFrom_lat)
            setFromLong(params.RoasterFrom_long)
            setFromElevation(params.FromElevation)
            setFromTimeZone(params.FromTimeZone)
            setFromDst(params.FromDst)
            setFromDstStatus(params.FromDstStatus)
            setFromDst_startDate(params.FromDst_startDate)
            setFromDst_endDate(params.FromDst_endDate)
            setFromICAO(params.FromItemicao)
            setFromIATA(params.FromItemiata)
            setFromSource(params.FromSource)

            setToAirportId(params.ToItemId)
            setToIdent(params.ToItemCode)
            setToAirportName(params.ToItemName)
            setToType(params.Toitemtype)
            setToCity1(params.ToCity1)
            setToCity2(params.ToCity2)
            setToCountry(params.ToCountry)
            setToLat(params.RoasterTo_lat)
            setToLong(params.RoasterTo_long)
            setToElevation(params.ToElevation)
            setToTimeZone(params.ToTimeZone)
            setToDst(params.ToDst)
            setToDstStatus(params.ToDstStatus)
            setToDst_startDate(params.ToDst_startDate)
            setToDst_endDate(params.ToDst_endDate)
            setToICAO(params.ToItemicao)
            setToIATA(params.ToItemiata)
            setToSource(params.ToSource)
        //}
    }, [params]);

    React.useEffect(() => {
        if (Approachparams.childParam) {
            setApproach1(Approachparams.ApproachMixture)
            setApproach2(Approachparams.ApproachMixture)
        }
    }, [Approachparams]);

    const purposeCheck = params.RosterPurpose
    const purposeCheck1 = purposeCheck == null? [] : purposeCheck.split(",");

    console.log('rosterChocksOff',params.RoasterSavedChocksOff)

    React.useEffect(async() => {
        if(isFocused){
            setRosterId(params.RoasterId)
            setRosterFrom(params.RoasterFrom)
            setRosterChocksOff(params.RoasterChocksOff)
            setRosterTo(params.RoasterTo)
            setRosterChocksOn(params.RoasterChocksOn)
            setRosterAType(params.RoasterAType)
            setRosterNamePic(params.RoasterP1)
            setRosterNameSic(params.RoasterP2)
            setRosterDayLand(params.RoasterDayLanding)
            setRosterNightLand(params.RoasterNightLanding)
            setRosterDayTakeOff(params.RoasterDayTO)
            setRosterNightTakeOff(params.RoasterNightTO)
            setRosterFromLat(params.RoasterFrom_lat)
            setRosterToLat(params.RoasterTo_lat)
            setListInstructor(params.RoasterInstructor)
            setSt(params.RoasterSim_type)
            setLocation(params.RoasterSimLoc)
            setSim_exercise(params.RoasterSim_exc)

            setTraining(purposeCheck1)
            setTest(purposeCheck1)
            setCommercial(purposeCheck1)
        }
    }, [isFocused]);

React.useEffect(() => {
   if(rosterAId==="SIMU"){
    setTakeOff(params.RoasterTakeoff)
    setLanding(params.Roasterlanding)
    setPfHours(params.RoasterPf_time)
    setPmHours(params.RoasterPm_time)
    setSf(params.RoasterSF)
   }
}, [rosterAId]);



React.useEffect(() => {
        setInstructor(Peopleparams.InstructorItemName)
        setReliefCrew1(params.RoasterRC1)
        setReliefCrew2(params.RoasterRC2)
        setReliefCrew3(params.RoasterRC3)
        setReliefCrew4(params.RoasterRC4)
        setStudent(params.RoasterStudent)
    }, [Peopleparams]);

    const {
        // flight 1
        flightToggle,
        routeToggle,
        takeOffToggle1,
        landingToggle1,
        //flight 2
        instructorToggle,
        Pic_toggle,
        rc1Toggle,
        rc2Toggle,
        rc3Toggle,
        rc4Toggle,
        sic_toggle,
        studentToggle,

        //Time
        totalTimeToggle,
        dayToggle,
        nightToggle,
        AiToggle,
        dualDayToggle,
        dualNightToggle,
        instructionalToggle,
        ifr_vfrToggle,
        p1_us_dayToggle,
        p1_us_nightToggle,
        p1_ut_dayToggle,
        p1_ut_nightToggle,
        Pic_dayToggle,
        Pic_nightToggle,
        stlToggle,
        siToggle,
        sic_dayToggle,
        sic_nightToggle,
        xc_dayToggle,
        xc_nightToggle,

        //Landing
        autoLandingToggle,
        dayLandingToggle,
        day_toToggle,
        fullStopToggle,
        nightLandingToggle,
        night_toToggle,
        touchGoToggle,
        waterLandingToggle,
        water_toToggle,

        //Approach
        Approach2Toggle,

        //simu
        STToggle,
        takeOffToggle,
        landingToggle,
        TO_totalTimeToggle,
        PFToggle,
        PMToggle,
        SFToggle,
    } = React.useContext(ConfigContext);

    const Configuration = () => {
        setConfig(config => !config);
        setModalVisible(!modalVisible);
    };

    const HideDoneConfig = () => {
        setConfig(config => !config);
    };
    
    const Add_Logbook = async () => {
        let user = await AsyncStorage.getItem('userdetails');
        user = JSON.parse(user);

        await fetch(BaseUrl + 'addLogbook', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "roaster_id": rosterId,
                "user_id": user.id,
                "tag": 'server',
                "date": ServeroriginalDate,
                "flight_no": '',
                "aircraftReg": rosterAId,
                "aircraftType": rosterAType,
                "route": route,
                "from_city": 'hello',
                "from_nameICAO": rosterFrom,
                "to_city": 'hello',
                "to_nameICAO": rosterTo,
                "p1": rosterNamePic,
                "p2": rosterNameSic,
                "totalTime": filghtTimeM,
                "day": dayTime,
                "night": nightTime,
                "actual_Instrument": ai,
                "dual_day": dual_day,
                "dual_night": dual_night,
                "ifr_vfr": fr,
                "p1_us_day": p1_us_day,
                "p1_us_night": p1_us_night,
                "p1_ut_day": p1_ut_day,
                "p1_ut_night": p1_ut_night,
                "pic_day": selfPICday,
                "pic_night": selfPICnight,
                "sim_instrument": si,
                "stl": stl,
                "sic_day": SelfSICday,
                "sic_night": SelfSICnight,
                "x_country_day": xc_day,
                "x_country_night": xc_night,
                "x_country_day_leg": xc_day_leg,
                "x_country_night_leg": xc_night_leg,
                "dayLanding": dayLanding,
                "nightLanding": nightLanding,
                "dayTO": day_to,
                "nightTO": night_to,
                "remark": remark,
                "timeCustom1": PurposeData.toString(),
                "timeCustom2": flightType,
                "timeCustom3": "",
                "timeCustom4": "",
                "timeCustom5": "",
                "timeCustom6": "",
                "timeCustom7": "",
                "timeCustom8": "",
                "timeCustom9": "",
                "timeCustom10": "",
                "landingCustom1": "",
                "landingCustom2": "",
                "landingCustom3": "",
                "landingCustom4":"",
                "landingCustom5": "",
                "landingCustom6": "",
                "landingCustom7": "",
                "landingCustom8": "",
                "landingCustom9": "",
                "landingCustom10": "",
                "approach1": Approach1,
                "approach2" : approach2,
                "approach3": "",
                "approach4": "",
                "approach5": "",
                "approach6": "",
                "approach7": "",
                "approach8": "",
                "approach9": "",
                "approach10": "",
                "crewCustom1": "",
                "crewCustom2": "",
                "crewCustom3": "",
                "crewCustom4": "",
                "crewCustom5": "",
                "onTime": rosterChocksOn,
                "offTime": rosterChocksOff,
                "inTime": landing,
                "outTime": takeOff,
                "reliefCrew1":reliefCrew1,
                "reliefCrew2":reliefCrew2,
                "reliefCrew3":reliefCrew3,
                "reliefCrew4":reliefCrew4,
                "reliefCrew5":"",
                "instructor":instructor,
                "instructional":instructional,
                "student":student,
                "waterLanding":waterLanding,
                "waterTO":water_to,
                "touch_n_gos":touchGo,
                "fullStop":fullStop,
                "autolanding":autoLanding,
                "flight":flight,
                "sim_type": St,
                "simLocation":location,
                "sim_exercise":Sim_exercise,	
                "pf_hours":pfHours,
                "pm_hours":pmHours,
                "sfi_sfe":sf,
                "from_lat":fromLatitude,
                "from_long":fromLongitude,
                "to_lat":toLatitude,
                "to_long":toLongitude,
            })
        }).then(res => res.json())
            .then(resData => {
            //    Alert.alert(resData.message);
            })
    };


    const deleteLogbbok = async () => {
        let user = await AsyncStorage.getItem('userdetails');
        user = JSON.parse(user);

        await fetch(BaseUrl + 'deletelogbook', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "user_id": user.id,
                "roaster_id": rosterId
            })
        }).then(res => res.json())
            .then(resData => {
                Alert.alert(resData.message);
            });
    };

    const DeleteLogs = () => {
        prePopulateddb.transaction(tx => {
          tx.executeSql(
            'DELETE FROM logbook WHERE id = "'+rosterId+'"', [], (tx, Delresult) => {
              SELECTAfterDel(true)
              navigation.navigate('LogBookListing')
            }
          );
        });
      }

      const SELECTAfterDel = async (deleteLog = false) => {
        let user = await AsyncStorage.getItem('userdetails');
        user = JSON.parse(user);
        if (deleteLog === true) {
          prePopulateddb.transaction(tx => {
            tx.executeSql(
                'SELECT * from logbook  WHERE user_id = "'+user.id+'" ORDER BY orderedDate DESC limit 5', [], (tx, result) => {
                      if (result.rows.length > 0) {
                      }
                      for (let i = 0; i <= result.rows.length; i++) {
                        if (result.rows.length !== 0){
                          temData.push({
                              id : result.rows.item(i).id,
                              tag : result.rows.item(i).tag,
                              user_id: result.rows.item(i).user_id,
                              date: result.rows.item(i).date,
                              from : result.rows.item(i).from_nameICAO,
                              to : result.rows.item(i).to_nameICAO,
                              from_lat : result.rows.item(i).from_lat,
                              from_long : result.rows.item(i).from_long,
                              to_lat : result.rows.item(i).to_lat, 
                              to_long : result.rows.item(i).to_long,
                              chocksOffTime : result.rows.item(i).offTime, 
                              chocksOnTime : result.rows.item(i).onTime,
                              approach1 : result.rows.item(i).approach1,
                              from_airportID : result.rows.item(i).from_airportID,
                              p1 : result.rows.item(i).p1,
                              p2 : result.rows.item(i).p2,
                              aircraftType : result.rows.item(i).aircraftType,
                              aircraftReg : result.rows.item(i).aircraftReg,
                          });
                          dataDispatcher(LogListData({data: temData, inProgress: false}))
                          
                        }
                        else {
                            dataDispatcher(LogListData({ data: [], inProgress: false }))
                          }
                    }
                  });
          });
        }
      }

    const OpenRosterDateModal = () => {
        setRosterModalVisible(true)
        setModalVisible(false)
       }

    const updateLogbbok = async () => {
        let user = await AsyncStorage.getItem('userdetails');
        user = JSON.parse(user);

        await fetch(BaseUrl + 'updateLogbook', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "user_id": user.id,
                "id": listId,
                "from_city": listFrom,
                "to_city": listTo,
                "p1": listP1,
                "p2": listP2,
                "date": listDate,
                "flight_no": listFlight,
                "aircraftReg": listAircraftId,
                "aircraftType": listAircraftType,
                "route": listRoute,
                "totalTime": listTotalTime,
                "day": listDay,
                "night": listNight,
                "actual_Instrument": listAi,
                "dual_day": listDualDay,
                "dual_night": listDualNight,
                "ifr_vfr": listFr,
                "p1_us_day": listP1UsDay,
                "p1_us_night": listP1UsNight,
                "p1_ut_day": listP1UtDay,
                "p1_ut_night": listP1UtNight,
                "pic_day": listPicDay,
                "pic_night": listPicNight,
                "sim_instrument": listSi,
                "stl": listStl,
                "sic_day": listSicDay,
                "sic_night": listSicNight,
                "x_country_day": listXcDay,
                "x_country_night": listXcNight,
                "x_country_day_leg": listXcDayLegs,
                "x_country_night_leg": listXcNightLegs,
                "dayLanding": listDayLanding,
                "nightLanding": listNightLanding,
                "dayTO": listDayTO,
                "nightTO": listNightTO,
                "remark": listRemark,
                "approach1": listApproach1,
                "approach2": listApproach2,
                "onTime": listChocksOn,
                "offTime": listChocksOff,
                "inTime": listLanding,
                "outTime": listTakeOff,
                "reliefCrew1": reliefCrew1,
                "reliefCrew2": reliefCrew2,
                "reliefCrew3": reliefCrew3,
                "reliefCrew4": reliefCrew4,
                "instructor": instructor,
                "instructional": listInstructional,
                "student": student,
                "waterLanding": waterLanding,
                "waterTO": water_to,
                "touch_n_gos": touchGo,
                "fullStop": fullStop,
                "autolanding": autoLanding,
            })
        }).then(res => res.json())
            .then(resData => {
                Alert.alert(resData.message);
            });
    };

   const getReduxApproachData = useSelector(state => state.approaches.Airport);

    //sqlite starts

    const selfPICday = rosterNamePic === 'Self' ? dayTime : setPic_day
    const selfPICnight = rosterNamePic === 'Self' ? nightTime : pic_night

    const SelfSICday = rosterNameSic === 'Self' ? dayTime : sic_day
    const SelfSICnight = rosterNameSic === 'Self' ? nightTime : sic_night

    const SelectQuery = () => {
        let selectedData = []; 
        prePopulateddb.transaction(tx => {
            tx.executeSql(
                'SELECT * from logbook WHERE id = "'+rosterId+'"', [], (tx, result) => {
                    for (let i = 0; i <= result.rows.length; i++) {
                    selectedData.push({
                        aircraftReg :  result.rows.item(i).aircraftReg    
                     });
                     if (rosterAId !== 'SIMU') setRosterAId(result.rows.item(i).aircraftReg)
                    }
                }
            );
        });
    }
    React.useEffect(() => {
        if (rosterAType) {
            SelectQuery()}}
        , [rosterAType]);

    const constUpdateP2 = () => {
        prePopulateddb.transaction(tx => {
            if (rosterNameSic !== '') {
                console.log('UPDATE logbook set p2="'+rosterNameSic+'",purpose1="'+PurposeData+'" where date="'+originalDate+'" AND isSaved != true')
                tx.executeSql(
                    'UPDATE logbook set p2="'+rosterNameSic+'",purpose1="'+PurposeData+'" where date="'+originalDate+'" AND isSaved IS NOT "true" ',
                );
            }
        });
    }
    const insertQuery = async() => {

        const SimulatedInstrument = (si) ? si: null
        const NIGHTtemp = (nightTime) ? nightTime : '00:52'
        let user = await AsyncStorage.getItem('userdetails');
        user = JSON.parse(user);
        if (!originalDate) {
          alert('Please select Date');
          return;
        }
        if (rosterAType.length === 1) {
          alert('Please select Aircraft Type');
          return;
        }
        if (!rosterFrom) {
          alert('Please select from');
          return;
        }
        if (!rosterTo) {
          alert('Please select to');
          return;
        }
        if (!rosterChocksOff && rosterAId!=='SIMU') {
          alert('Please fill chocks off time');
          return;
        }
        if (!rosterChocksOn && rosterAId!=='SIMU') {
            alert('Please fill chocks on time');
            return;
          }
        if (!rosterNameSic && rosterAId!=='SIMU') {
            alert('Please fill P2');
            return;
          }

        prePopulateddb.transaction(tx => {
        if (rosterId && rosterAId !== 'SIMU') {
           //let temData = [];
            tx.executeSql(
                'UPDATE logbook set tag="manual", user_id="'+user.id+'" , flight_no="", date="'+originalDate+'", day="'+dayTime+'", actual_Instrument="'+ai+'", aircraftReg="'+rosterAId+'", aircraftType="'+rosterAType+'", approach1="'+Approach1+'", approach2="'+approach2+'", approach3="", approach4="", approach5="", approach6="", approach7="", approach8="", approach9="", approach10="", crewCustom1="", crewCustom2="", crewCustom3="", crewCustom4="", crewCustom5="", dayLanding="'+dayLanding+'", dayTO="'+day_to+'", dual_day="'+dual_day+'", dual_night="'+dual_night+'", flight="'+flight+'", from_airportID="'+fromAirportid+'", from_altitude="'+fromElevation+'", from_city="", from_country="'+fromCountry+'", from_dayLightSaving="'+fromDst+'", from_source="'+fromSource+'", from_lat="'+fromLatitude+'", from_long="'+fromLongitude+'", from_name="'+fromAirportname+'", from_nameIATA="", from_nameICAO="'+rosterFrom+'", from_timeZone="'+fromTimeZone+'", from_type="'+fromType+'", from_dst_status="'+fromDstStatus+'", fullStop="'+fullStop+'", ifr_vfr="'+fr+'", instructional="'+instructional+'", instructor="'+instructor+'", inTime="'+landing+'", landingCustom1="", landingCustom2="", landingCustom3="", landingCustom4="", landingCustom5="", landingCustom6="", landingCustom7="", landingCustom8="", landingCustom9="", landingCustom10="", night="'+nightTime+'", nightLanding="'+nightLanding+'", nightTO="'+night_to+'", offTime="'+rosterChocksOff+'", onTime="'+rosterChocksOn+'", outTime="'+takeOff+'", p1="'+rosterNamePic+'", p1_us_day="'+p1_us_day+'", p1_us_night="'+p1_us_night+'", p2="'+rosterNameSic+'", pic_day="'+selfPICday+'", pic_night="'+selfPICnight+'", stl="'+stl+'", reliefCrew1="'+reliefCrew1+'", reliefCrew2="'+reliefCrew2+'", reliefCrew3="'+reliefCrew3+'", reliefCrew4="'+reliefCrew4+'", route="'+route+'", sic_day="'+SelfSICday+'", sic_night="'+SelfSICnight+'", sim_instructional="", sim_instrument="'+SimulatedInstrument+'", selected_role="", student="'+student+'", timeCustom1="", timeCustom2="", timeCustom3="", timeCustom4="", timeCustom5="", timeCustom6="", timeCustom7="", timeCustom8="", timeCustom9="", timeCustom10="", to_airportID="'+toAirportid+'", to_altitude="'+toElevation+'", to_city="", to_country="'+toCountry+'", to_dayLightSaving="'+toDst+'", to_source="'+toSource+'", to_lat="'+toLatitude+'", to_long="'+toLongitude+'", to_name="'+toAirportname+'", to_nameIATA="", to_nameICAO="'+rosterTo+'", to_timeZone="'+toTimeZone+'", to_type="'+toType+'", to_dst_status="'+toDstStatus+'", totalTime="'+filghtTimeM+'", touch_n_gos="'+touchGo+'", waterLanding="'+waterLanding+'", waterTO="'+water_to+'", x_country_day="'+xc_day+'", x_country_night="'+xc_night+'", x_country_day_leg="'+xc_day_leg+'", x_country_night_leg="'+xc_night_leg+'", outTime_LT="", offTime_LT="", onTime_LT="", inTime_LT="", sim_type="'+St+'", sim_exercise="'+Sim_exercise+'", pf_time="'+pfHours+'", pm_time="'+pmHours+'", sfi_sfe="'+sf+'", simCustom1="", simCustom2="", simCustom3="", simCustom4="", simCustom5="", simLocation="'+location+'", p1_ut_day="'+p1_ut_day+'", p1_ut_night="'+p1_ut_night+'", remark="'+remark+'", autolanding="'+autoLanding+'", flight_date="", selected_flight_timelog="", imported_log="", orderedDate="'+sortedDate+'", purpose1="'+PurposeData+'", distance="'+distance+'",isSaved="true" where id="'+rosterId+'"')
            }
        else if(rosterAId !== 'SIMU'){
            tx.executeSql(
            'INSERT INTO logbook (tag, user_id, flight_no, date, day,  actual_Instrument, aircraftReg, aircraftType, approach1, approach2, approach3, approach4, approach5, approach6, approach7, approach8, approach9, approach10, crewCustom1, crewCustom2, crewCustom3, crewCustom4, crewCustom5, dayLanding, dayTO, dual_day, dual_night, flight, from_airportID, from_altitude, from_city, from_country, from_dayLightSaving, from_source, from_lat, from_long, from_name, from_nameIATA, from_nameICAO, from_timeZone, from_type, from_dst_status, fullStop, ifr_vfr, instructional, instructor, inTime, landingCustom1, landingCustom2, landingCustom3, landingCustom4, landingCustom5, landingCustom6, landingCustom7, landingCustom8, landingCustom9, landingCustom10, night, nightLanding, nightTO, offTime, onTime, outTime, p1, p1_us_day, p1_us_night, p2, pic_day, pic_night, stl, reliefCrew1, reliefCrew2, reliefCrew3, reliefCrew4, route, sic_day, sic_night, sim_instructional, sim_instrument, selected_role, student, timeCustom1, timeCustom2, timeCustom3, timeCustom4, timeCustom5, timeCustom6, timeCustom7, timeCustom8, timeCustom9, timeCustom10, to_airportID, to_altitude, to_city, to_country, to_dayLightSaving, to_source, to_lat, to_long, to_name, to_nameIATA, to_nameICAO, to_timeZone, to_type, to_dst_status, totalTime, touch_n_gos, waterLanding, waterTO, x_country_day, x_country_night, x_country_day_leg, x_country_night_leg, outTime_LT, offTime_LT, onTime_LT, inTime_LT, sim_type, sim_exercise, pf_time, pm_time, sfi_sfe, simCustom1, simCustom2, simCustom3, simCustom4, simCustom5, simLocation, p1_ut_day, p1_ut_night, remark, autolanding, flight_date, selected_flight_timelog, imported_log, orderedDate,purpose1,distance,isSaved)  VALUES ("manual","'+user.id+'", "" ,"'+originalDate+'" , "'+dayTime+'" , "'+ai+'" , "'+rosterAId+'" , "'+rosterAType+'" , "'+Approach1+'" , "'+approach2+'" , "" , "" , "" , "" , "" , "" , "" , "" , "" , "" , "" , "" , "" , "'+dayLanding+'" , "'+day_to+'" , "'+dual_day+'" , "'+dual_night+'" , "'+flight+'" , "'+fromAirportid+'" , "'+fromElevation+'" , "" , "'+fromCountry+'" , "'+fromDst+'" , "'+fromSource+'" , "'+fromLatitude+'" , "'+fromLongitude+'" , "'+fromAirportname+'" , "" , "'+rosterFrom+'", "'+fromTimeZone+'" , "'+fromType+'" , "'+fromDstStatus+'" , "'+fullStop+'" , "'+fr+'" , "'+instructional+'" , "'+instructor+'" , "'+landing+'" , "" , "" , "" , "" , "" , "" , "" , "" , "" , "" , "'+nightTime+'" , "'+nightLanding+'" , "'+night_to+'" , "'+rosterChocksOff+'" , "'+rosterChocksOn+'" , "'+takeOff+'" , "'+rosterNamePic+'" , "'+p1_us_day+'" , "'+p1_us_night+'" , "'+rosterNameSic+'" , "'+selfPICday+'" , "'+selfPICnight+'" , "'+stl+'" , "'+reliefCrew1+'" , "'+reliefCrew2+'" , "'+reliefCrew3+'" , "'+reliefCrew4+'" , "'+route+'" , "'+SelfSICday+'" , "'+SelfSICnight+'" , "" , "'+SimulatedInstrument+'" , "" , "'+student+'" , "" , "" , "" , "" , "" , "" , "" , "" , "" , "" , "'+toAirportid+'" , "'+toElevation+'" , "" , "'+toCountry+'" , "'+toDst+'" , "'+toSource+'" , "'+toLatitude+'" , "'+toLongitude+'" , "'+toAirportname+'" , "" , "'+rosterTo+'" , "'+toTimeZone+'" , "'+toType+'" , "'+toDstStatus+'" , "'+filghtTimeM+'" , "'+touchGo+'" , "'+waterLanding+'" , "'+water_to+'" , "'+xc_day+'" , "'+xc_night+'" , "'+xc_day_leg+'" , "'+xc_night_leg+'" , "" , "" , "" , "" , "'+St+'" , "'+Sim_exercise+'" , "'+pfHours+'" , "'+pmHours+'" , "'+sf+'" , "" , "" , "" , "" , "" , "'+location+'" , "'+p1_ut_day+'" , "'+p1_ut_night+'" , "'+remark+'" , "'+autoLanding+'" , "" , "" , "" , "'+sortedDate+'", "'+PurposeData+'", "'+distance+'","true")',
          )
        }
        else if (rosterId && rosterAId==='SIMU') {
            tx.executeSql(
                'UPDATE logbook set tag="manual",user_id="'+user.id+'",date="'+originalDate+'",flight="'+flight+'",aircraftType="'+rosterAType+'",aircraftReg="'+rosterAId+'",sim_type="'+St+'",from_nameICAO="'+rosterFrom+'",to_nameICAO="'+rosterTo+'",simLocation="'+location+'",sim_exercise="'+Sim_exercise+'",outTime="'+takeOff+'",inTime="'+landing+'",totalTime="'+filghtTimeM+'",pf_time="'+pfHours+'",pm_time="'+pmHours+'",sfi_sfe="'+sf+'",remark="'+remark+'",orderedDate="'+sortedDate+'" , isSaved="true" where id="'+rosterId+'"'
            );
        }
        else if (rosterAId==='SIMU') {
            tx.executeSql(
                'INSERT INTO logbook (tag, user_id, date, flight, aircraftType, aircraftReg, sim_type, from_nameICAO, to_nameICAO, simLocation, sim_exercise, outTime, inTime, totalTime, pf_time, pm_time, sfi_sfe, simCustom1, simCustom2, simCustom3, simCustom4, simCustom5, remark,orderedDate,isSaved ) VALUES ("manual","'+user.id+'","'+originalDate+'", "'+flight+'", "'+rosterAType+'", "'+rosterAId+'", "'+St+'", "'+rosterFrom+'", "'+rosterTo+'", "'+location+'", "'+Sim_exercise+'", "'+takeOff+'", "'+landing+'", "'+filghtTimeM+'", "'+pfHours+'", "'+pmHours+'", "'+sf+'", "", "", "", "", "", "'+remark+'", "'+sortedDate+'","true")',

            );
        }

        });
        //alert('Saved Successfully');
        navigation.goBack();
      };

    //sqlite ends

    const monthNames = ["Jan", "Feb", "March", "April", "May", "June",
        "July", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const ddmmyy = ("0" + rosterDate.getDate()).slice(-2) + "-" + ("0" + (rosterDate.getMonth() + 1)).slice(-2) + "-" + rosterDate.getFullYear();
    const mmddyy = ("0" + (rosterDate.getMonth() + 1)).slice(-2) + "-" + ("0" + rosterDate.getDate()).slice(-2) + "-" + rosterDate.getFullYear()
    
    const Serverddmmyy = ("0" + rosterDate.getDate()).slice(-2) + "-" + (monthNames[rosterDate.getMonth()]) + "-" + rosterDate.getFullYear();
    const Servermmddyy = (monthNames[rosterDate.getMonth()]) + "-" + ("0" + rosterDate.getDate()).slice(-2) + "-" + rosterDate.getFullYear()



    const sortedDate  = rosterDate.getFullYear() + ("0" + (rosterDate.getMonth() + 1)).slice(-2) + ("0" + rosterDate.getDate()).slice(-2)

    //Get Data from form
    
    //day_night calculation
    const day_night_calc = () => {
        var depT = rosterChocksOff; 
        let onlyDate1 = '';
        var depTemp = depT.split(":");
        var depH = Number(depTemp[0]);
        var depM = Number(depTemp[1]);
        var arrT = rosterChocksOn;
        var arrTemp = arrT.split(":");
        var arrH = Number(arrTemp[0]);
        var arrM = Number(arrTemp[1]);
        var departureTimeM = new Date('2021-07-22'); //yyyy-mm-dd
        onlyDate1 = rosterDate.getFullYear() + "-" + ("0" + (rosterDate.getMonth() + 1)).slice(-2) + "-" + ("0" + rosterDate.getDate()).slice(-2) // otherwise use date 
        var dateOfFlight =  new Date(onlyDate1);
        var departureTimeM = new Date ( onlyDate1 );
        var test = departureTimeM.setHours(depH);
        departureTimeM.setMinutes(depM);
        var arrivelTimeM = new Date(onlyDate1); //yyyy-mm-dd
        arrivelTimeM.setHours(arrH);
        arrivelTimeM.setMinutes(arrM);
        let fromLat = fromLatitude;
        let fromLong = fromLongitude;
        let toLat = toLatitude;
        let toLong = toLongitude;
        let day_landing = 0;
        let day_takeoff = 0;
        let night_landing = 0;
        let night_takeoff = 0;


        //total flight time
        var filghtTimeM = getFlightTime(dateToMinuts(departureTimeM), dateToMinuts(arrivelTimeM));
        if (departureTimeM > arrivelTimeM && departureTimeM.getHours() > 20 && arrivelTimeM.getHours() < 10) {
            departureTimeM.setDate(departureTimeM.getDate() - 1);
        } else if (departureTimeM > arrivelTimeM && departureTimeM.getHours() > 12 && arrivelTimeM.getHours() < 12) {
            arrivelTimeM.setDate(arrivelTimeM.getDate() + 1);
        }

        //Distance of departure and destination
        var distance = distance(fromLat, fromLong, toLat, toLong, 'N'); // in nm
        setDistance(distance)

        //SunRise and SunSet of departure and destination
        var sunRiseDepartureTimeM = (solar_event(dateOfFlight, fromLat, fromLong, true, 90.833333));//23:30
        var sunSetDepartureTimeM = (solar_event(dateOfFlight, fromLat, fromLong, false, 90.833333));//12:30
        var sunRiseDestinationTimeM = (solar_event(dateOfFlight, toLat, toLong, true, 90.833333));//00:36
        var sunSetDestinationTimeM = (solar_event(dateOfFlight, toLat, toLong, false, 90.833333));//13:11
        if (sunRiseDepartureTimeM.getHours() > 20) {
            sunRiseDepartureTimeM.setDate(sunRiseDepartureTimeM.getDate() - 1);
        }
        if (sunRiseDestinationTimeM.getHours() > 20) {
            sunRiseDestinationTimeM.setDate(sunRiseDestinationTimeM.getDate() - 1);
        }
        if (sunSetDepartureTimeM.getHours() < 5) {
            sunSetDepartureTimeM.setDate(sunSetDepartureTimeM.getDate() + 1);
        }
        if (sunSetDestinationTimeM.getHours() < 5) {
            sunSetDestinationTimeM.setDate(sunSetDestinationTimeM.getDate() + 1);
        }

        // for pilots rules add 30 mints in sun sunsets and subtract 30 mints in sunrises
        sunRiseDepartureTimeM.setMinutes(sunRiseDepartureTimeM.getMinutes() - 30);
        sunSetDepartureTimeM.setMinutes(sunSetDepartureTimeM.getMinutes() + 30);
        sunRiseDestinationTimeM.setMinutes(sunRiseDestinationTimeM.getMinutes() - 30);
        sunSetDestinationTimeM.setMinutes(sunSetDestinationTimeM.getMinutes() + 30);


        //Speed of AirCraft
        var airCraftSpeed = distance / filghtTimeM;


        if ((sunRiseDepartureTimeM < sunRiseDestinationTimeM) && (sunSetDepartureTimeM < sunSetDestinationTimeM)) {
            //difference in sunrises
            var diffSunRiseTime = (dateToMinuts(sunRiseDestinationTimeM) - dateToMinuts(sunRiseDepartureTimeM));
            if (diffSunRiseTime < 0) { diffSunRiseTime = diffSunRiseTime + 1440; }
            if (diffSunRiseTime > 1440) { diffSunRiseTime = diffSunRiseTime - 1440; }

            var diffSunSetTime = (dateToMinuts(sunSetDestinationTimeM) - dateToMinuts(sunSetDepartureTimeM));
            if (diffSunSetTime < 0) { diffSunSetTime = diffSunSetTime + 1440; }
            if (diffSunSetTime > 1440) { diffSunSetTime = diffSunSetTime - 1440; }

            if ((departureTimeM < sunRiseDepartureTimeM) && (arrivelTimeM > sunRiseDestinationTimeM)) {

                //speed difference betwwen sun and aircraft
                var sunSpeed = distance / diffSunRiseTime;
                var SpeedDiff = sunSpeed - airCraftSpeed;

                // calculate time diffrence between Departure time and sunrise time
                var flyingTimeBeforeSR = dateToMinuts(sunRiseDepartureTimeM) - dateToMinuts(departureTimeM);

                //AirCraft Travel in flyingTimeBeforeSRM Time
                // var travelBeforeSR = (distance * flyingTimeBeforeSR) / filghtTimeM;
                var travelBeforeSR = airCraftSpeed * flyingTimeBeforeSR;

                //Time taken by sun to catch up the flight in minuts
                var catchupTime = travelBeforeSR / SpeedDiff;

                //So totaltime travel in night
                var nightTime = catchupTime + flyingTimeBeforeSR;
                if (nightTime <= 0) {
                    nightTime = 0;
                } else if (nightTime > filghtTimeM) {
                    nightTime = filghtTimeM;
                }

                // So DayTime = TotalTime - NightTime
                var dayTime = filghtTimeM - nightTime;

                var dayTimeH = timeConvert(dayTime);
                var filghtTimeH = timeConvert(filghtTimeM);
                var nightTimeH = timeConvert(nightTime);
                night_takeoff = 1;
                day_landing = 1;



                var result = "N-D : filghtTimeM:  " + setfilghtTimeM(filghtTimeH) + "------nightTime:  " + setNightTime(nightTimeH) + "----DayTime: " + setDayTime(dayTimeH) + "---day_landing: "+ setDayLanding(day_landing) + "---day_takeoff: "+ setDay_to(day_takeoff) + "---night_landing: "+ setNightLanding(night_landing) + "---night_takeoff: "+ setNight_to(night_takeoff) + "----sic_day:"+ setSic_day(dayTimeH)+ "-----sic_night:"+ setSic_night(nightTimeH);
                //$('#result').html(result);

            } else if ((departureTimeM > sunRiseDepartureTimeM) && (arrivelTimeM < sunSetDestinationTimeM)) {

                var dayTime = filghtTimeM;
                var nightTime = 0;

                var dayTimeH = timeConvert(dayTime);
                var filghtTimeH = timeConvert(filghtTimeM);
                var nightTimeH = timeConvert(nightTime);

                day_landing = 1;
                day_takeoff = 1;
                var result = "D-D : filghtTimeM:  " + setfilghtTimeM(filghtTimeH) + "------nightTime:  " + setNightTime(nightTimeH) + "----DayTime: " + setDayTime(dayTimeH) + "---day_landing: "+ setDayLanding(day_landing) + "---day_takeoff: "+ setDay_to(day_takeoff) + "---night_landing: "+ setNightLanding(night_landing) + "---night_takeoff: "+ setNight_to(night_takeoff)+ "----sic_day:"+ setSic_day(dayTimeH)+ "-----sic_night:"+ setSic_night(nightTimeH);
                //$('#result').html(result);

            } else if ((departureTimeM > sunSetDepartureTimeM) && (arrivelTimeM > sunSetDestinationTimeM)) {

                var nightTime = filghtTimeM;
                var dayTime = 0;

                var dayTimeH = timeConvert(dayTime);
                var filghtTimeH = timeConvert(filghtTimeM);
                var nightTimeH = timeConvert(nightTime);

                night_takeoff = 1;
                night_landing = 1;
                var result = "N-N : filghtTimeM:  " + setfilghtTimeM(filghtTimeH) + "------nightTime:  " + setNightTime(nightTimeH) + "----DayTime: " + setDayTime(dayTimeH) + "---day_landing: "+ setDayLanding(day_landing) + "---day_takeoff: "+ setDay_to(day_takeoff) + "---night_landing: "+ setNightLanding(night_landing) + "---night_takeoff: "+ setNight_to(night_takeoff)+ "----sic_day:"+ setSic_day(dayTimeH)+ "-----sic_night:"+ setSic_night(nightTimeH);
                //$('#result').html(result);

            } else if ((departureTimeM < sunSetDepartureTimeM) && (arrivelTimeM > sunSetDestinationTimeM)) {
                // total day time
                var dayTime = dateToMinuts(sunSetDepartureTimeM) - dateToMinuts(departureTimeM);

                // calculate Sun speed
                var sunSpeedM = distance / diffSunSetTime; // in nm

                // crossing speed
                var crossingSpeed = sunSpeedM - airCraftSpeed;

                // travel by AirCraft in day time of flight
                var travelAC = airCraftSpeed * dayTime;

                var distanceLeft = distance - travelAC;

                if (distanceLeft <= 50) {
                    var totalDayTime = filghtTimeM;
                } else {
                    var time_by_sun_to_catch_aircraft = travelAC / crossingSpeed;
                    var totalDayTime = dayTime + time_by_sun_to_catch_aircraft;
                }
                var nightTime = filghtTimeM - totalDayTime;

                var dayTimeH = timeConvert(totalDayTime);
                var filghtTimeH = timeConvert(filghtTimeM);
                var nightTimeH = timeConvert(nightTime);

                day_takeoff = 1;
                night_landing =1;
                var result = "D-N : filghtTimeM:  " + setfilghtTimeM(filghtTimeH) + "------nightTime:  " + setNightTime(nightTimeH) + "----DayTime: " + setDayTime(dayTimeH) + "---day_landing: "+ setDayLanding(day_landing) + "---day_takeoff: "+ setDay_to(day_takeoff) + "---night_landing: "+ setNightLanding(night_landing) + "---night_takeoff: "+ setNight_to(night_takeoff)+ "----sic_day:"+ setSic_day(dayTimeH)+ "-----sic_night:"+ setSic_night(nightTimeH);
                //$('#result').html(result);
            }
        } else {
            //difference in sunrises
            var diffSunRiseTime = (dateToMinuts(sunRiseDepartureTimeM) - dateToMinuts(sunRiseDestinationTimeM));
            if (diffSunRiseTime < 0) { diffSunRiseTime = diffSunRiseTime + 1440; }
            if (diffSunRiseTime > 1440) { diffSunRiseTime = diffSunRiseTime - 1440; }

            var diffSunSetTime = (dateToMinuts(sunSetDepartureTimeM) - dateToMinuts(sunSetDestinationTimeM));
            if (diffSunSetTime < 0) { diffSunSetTime = diffSunSetTime + 1440; }
            if (diffSunSetTime > 1440) { diffSunSetTime = diffSunSetTime - 1440; }

            if ((departureTimeM < sunRiseDepartureTimeM) && (arrivelTimeM > sunRiseDestinationTimeM)) {


                //speed difference betwwen sun and aircraft
                var sunSpeed = distance / diffSunRiseTime;
                var crossingSpeed = sunSpeed + airCraftSpeed;

                // calculate time diffrence between Departure time and sunrise time
                var sunRiseAndDepTime = dateToMinuts(sunRiseDepartureTimeM) - dateToMinuts(departureTimeM);
                if (sunRiseAndDepTime < 0) {
                    sunRiseAndDepTime = 1440 + sunRiseAndDepTime;
                }
                if (sunRiseAndDepTime > 1440) {
                    sunRiseAndDepTime = 1440 - sunRiseAndDepTime;
                }

                //distance bt sun at departure
                var sunAndDepTravel = sunSpeed * sunRiseAndDepTime;


                //aircraft will meet sun at timeF
                var meetingTime = sunAndDepTravel / crossingSpeed;

                //So totaltime travel in night
                var nightTime = meetingTime;
                if (nightTime <= 0) {
                    nightTime = 0;
                } else if (nightTime > filghtTimeM) {
                    nightTime = filghtTimeM;
                }

                // So DayTime = TotalTime - NightTime
                var dayTime = filghtTimeM - nightTime;

                var dayTimeH = timeConvert(dayTime);
                var filghtTimeH = timeConvert(filghtTimeM);
                var nightTimeH = timeConvert(nightTime);

                night_takeoff = 1;
                day_landing = 1;
                var result = "N-D : filghtTimeM:  " + setfilghtTimeM(filghtTimeH) + "------nightTime:  " + setNightTime(nightTimeH) + "----DayTime: " + setDayTime(dayTimeH) + "---day_landing: "+ setDayLanding(day_landing) + "---day_takeoff: "+ setDay_to(day_takeoff) + "---night_landing: "+ setNightLanding(night_landing) + "---night_takeoff: "+ setNight_to(night_takeoff)+ "----sic_day:"+ setSic_day(dayTimeH)+ "-----sic_night:"+ setSic_night(nightTimeH);
                //$('#result').html(result);

            } else if ((departureTimeM >= sunRiseDepartureTimeM) && (arrivelTimeM <= sunSetDestinationTimeM)) {

                var dayTime = filghtTimeM;
                var nightTime = 0;

                var dayTimeH = timeConvert(dayTime);
                var filghtTimeH = timeConvert(filghtTimeM);
                var nightTimeH = timeConvert(nightTime);

                day_takeoff = 1;
                day_landing = 1;
                var result = "D-D : filghtTimeM:  " + setfilghtTimeM(filghtTimeH) + "------nightTime:  " + setNightTime(nightTimeH) + "----DayTime: " + setDayTime(dayTimeH) + "---day_landing: "+ setDayLanding(day_landing) + "---day_takeoff: "+ setDay_to(day_takeoff) + "---night_landing: "+ setNightLanding(night_landing) + "---night_takeoff: "+ setNight_to(night_takeoff)+ "----sic_day:"+ setSic_day(dayTimeH)+ "-----sic_night:"+ setSic_night(nightTimeH);
                //$('#result').html(result);

            } else if ((departureTimeM >= sunSetDepartureTimeM) && (arrivelTimeM >= sunSetDestinationTimeM)) {

                var nightTime = filghtTimeM;
                var dayTime = 0;

                var dayTimeH = timeConvert(dayTime);
                var filghtTimeH = timeConvert(filghtTimeM);
                var nightTimeH = timeConvert(nightTime);

                night_takeoff = 1;
                night_landing = 1;
                var result = "N-N : filghtTimeM:  " + setfilghtTimeM(filghtTimeH) + "------nightTime:  " + setNightTime(nightTimeH) + "----DayTime: " + setDayTime(dayTimeH) + "---day_landing: "+ setDayLanding(day_landing) + "---day_takeoff: "+ setDay_to(day_takeoff) + "---night_landing: "+ setNightLanding(night_landing) + "---night_takeoff: "+ setNight_to(night_takeoff)+ "----sic_day:"+ setSic_day(dayTimeH)+ "-----sic_night:"+ setSic_night(nightTimeH);
                //$('#result').html(result);

            } else if ((departureTimeM < sunSetDepartureTimeM) && (arrivelTimeM > sunSetDestinationTimeM)) {


                // total day time
                var dayTime = dateToMinuts(sunSetDepartureTimeM) - dateToMinuts(departureTimeM);

                // calculate Sun speed
                var sunSpeedM = distance / diffSunSetTime; // in nm

                var crossingSpeed = sunSpeedM + airCraftSpeed;

                // travel by sun in day time of flight
                // var travelSun = sunSpeedM * dayTime;

                // travel by AirCraft in day time of flight
                var travelAC = airCraftSpeed * dayTime;

                // Aircraft will travel this distance in this time=
                var acDayTime = travelAC / crossingSpeed;

                // var sunDayTime = sunDayTravel / airCraftSpeed;


                totalDayTime = dayTime - acDayTime;

                if (totalDayTime > filghtTimeM) {
                    totalDayTime = totalDayTime - filghtTimeM;
                } else if (totalDayTime < 0) {
                    totalDayTime = filghtTimeM;
                }
                var nightTime = filghtTimeM - totalDayTime;

                var dayTimeH = timeConvert(totalDayTime);
                var filghtTimeH = timeConvert(filghtTimeM);
                var nightTimeH = timeConvert(nightTime);

                day_takeoff = 1;
                night_landing = 1;
                var result = "D-N : filghtTimeM:  " + setfilghtTimeM(filghtTimeH) + "------nightTime:  " + setNightTime(nightTimeH) + "----DayTime: " + setDayTime(dayTimeH) + "---day_landing: "+ setDayLanding(day_landing) + "---day_takeoff: "+ setDay_to(day_takeoff) + "---night_landing: "+ setNightLanding(night_landing) + "---night_takeoff: "+ setNight_to(night_takeoff)+ "----sic_day:"+ setSic_day(dayTimeH)+ "-----sic_night:"+ setSic_night(nightTimeH);
                //$('#result').html(result);

            }
        }
       

        function getFlightTime(departureTimeM, arrivelTimeM) {
            if (arrivelTimeM > departureTimeM) {
                filghtTimeM = arrivelTimeM - departureTimeM;
            } else if (departureTimeM > 720) {
                var ab = (1440 - departureTimeM);
                filghtTimeM = arrivelTimeM + ab;
            }
            return filghtTimeM;
        }

        function dateToMinuts(timeH) {
            var timeM = (timeH.getHours() * 60) + (timeH.getMinutes()); //M = in Minuts
            return timeM;
        }

        function hourToMinuts(timeH) {
            var timeTemp = timeH.split(":");
            var timeM = (Number(timeTemp[0]) * 60) + Number(timeTemp[1]); //M = in Minuts
            return timeM;
        }

        function timeConvert(n) {
            var num = n;
            var hours = (num / 60);
            var rhours = Math.floor(hours);
            var minutes = (hours - rhours) * 60;
            var rminutes = Math.round(minutes);
            if (rminutes < 10) { rminutes = "0" + rminutes; }
            if (rhours < 10) { rhours = "0" + rhours; }
            return rhours + ":" + rminutes;
        }

        function solar_event(date, latitude, longitude, rising, zenith) {
            var year = date.getFullYear(),
                month = date.getMonth() + 1,
                day = date.getDate();
            var floor = Math.floor,
                degtorad = function (deg) {
                    return Math.PI * deg / 180;
                },
                radtodeg = function (rad) {
                    return 180 * rad / Math.PI;
                },
                sin = function (deg) {
                    return Math.sin(degtorad(deg));
                },
                cos = function (deg) {
                    return Math.cos(degtorad(deg));
                },
                tan = function (deg) {
                    return Math.tan(degtorad(deg));
                },
                asin = function (x) {
                    return radtodeg(Math.asin(x));
                },
                acos = function (x) {
                    return radtodeg(Math.acos(x));
                },
                atan = function (x) {
                    return radtodeg(Math.atan(x));
                },
                modpos = function (x, m) {
                    return ((x % m) + m) % m;
                };

            // 1. first calculate the day of the year
            var N1 = floor(275 * month / 9),
                N2 = floor((month + 9) / 12),
                N3 = (1 + floor((year - 4 * floor(year / 4) + 2) / 3)),
                N = N1 - (N2 * N3) + day - 30;

            // 2. convert the longitude to hour value and calculate an approximate time
            var lngHour = longitude / 15,
                t = N + (((rising ? 6 : 18) - lngHour) / 24);

            // 3. calculate the Sun's mean anomaly
            var M = (0.9856 * t) - 3.289;

            // 4. calculate the Sun's true longitude
            var L = M + (1.916 * sin(M)) + (0.020 * sin(2 * M)) + 282.634;
            L = modpos(L, 360); // NOTE: L potentially needs to be adjusted into the range [0,360) by adding/subtracting 360
            // 5a. calculate the Sun's right ascension
            var RA = atan(0.91764 * tan(L));
            RA = modpos(RA, 360); // NOTE: RA potentially needs to be adjusted into the range [0,360) by adding/subtracting 360
            // 5b. right ascension value needs to be in the same quadrant as L
            var Lquadrant = (floor(L / 90)) * 90,
                RAquadrant = (floor(RA / 90)) * 90;
            RA = RA + (Lquadrant - RAquadrant);

            // 5c. right ascension value needs to be converted into hours
            RA = RA / 15;

            // 6. calculate the Sun's declination
            var sinDec = 0.39782 * sin(L),
                cosDec = cos(asin(sinDec));

            // 7a. calculate the Sun's local hour angle
            var cosH = (cos(zenith) - (sinDec * sin(latitude))) / (cosDec * cos(latitude));
            var H;

            if (cosH > 1) {
                return undefined; // the sun never rises on this location (on the specified date)
            } else if (cosH < -1) {
                return undefined; // the sun never sets on this location (on the specified date)
            }

            // 7b. finish calculating H and convert into hours
            if (rising) {
                H = 360 - acos(cosH);
            } else {
                H = acos(cosH);
            }
            H = H / 15;

            // 8. calculate local mean time of rising/setting
            var T = H + RA - (0.06571 * t) - 6.622;

            // 9. adjust back to UTC
            var UT = T - lngHour;
            UT = modpos(UT, 24); // NOTE: UT potentially needs to be adjusted into the range [0,24) by adding/subtracting 24

            var hours = floor(UT),
                minutes = Math.round(60 * (UT - hours));
            var result = new Date(year, month - 1, day, hours, minutes);
            return result;
        }

        function distance(lat1, lon1, lat2, lon2, unit) {
            if ((lat1 == lat2) && (lon1 == lon2)) {
                return 0;
            }
            else {
                var radlat1 = Math.PI * lat1 / 180;
                var radlat2 = Math.PI * lat2 / 180;
                var theta = lon1 - lon2;
                var radtheta = Math.PI * theta / 180;
                var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
                if (dist > 1) {
                    dist = 1;
                }
                dist = Math.acos(dist);
                dist = dist * 180 / Math.PI;
                dist = dist * 60 * 1.1515;
                if (unit == "K") { dist = dist * 1.609344 }
                if (unit == "N") { dist = dist * 0.8684 }
                return dist;
            }
        }
    }

    
    React.useEffect(() => {
        if (rosterChocksOff && rosterChocksOn) {
        day_night_calc()}}
        , [rosterChocksOff,rosterChocksOn]);
//calculations ends

    const resetHandler = () => {
        setRosterDate(new Date())
        setFlight("");
        setAircraft_name("")
        setAircraftId("")
        //setFrom("")
        setFromICAO("")
        //setTo("")
        setToICAO("")
        setChocksOff("")
        setChocksOn("")
        setTakeOff("")
        setLanding("")
        setRoute("")
        setPic_p1("")
        setSic_p2("")
        setInstructor("")
        setReliefCrew1("")
        setReliefCrew2("")
        setReliefCrew3("")
        setReliefCrew4("")
        setStudent("")
        setDay("")
        setNight("")
        setAi("")
        setDual_day("")
        setDual_night("")
        setP1_us_day("")
        setP1_us_night("")
        setP1_ut_day("")
        setP1_ut_night("")
        setPic_day("")
        setPic_night("")
        setStl(false)
        setSi("")
        setSic_day("")
        setSic_night("")
        setXc_day("")
        setXc_night("")
        setXc_dayLeg("")
        setXc_nightLeg("")
        setInstructional("")
        setAutoLanding("")
        setDayLanding("")
        setDay_to("")
        setNightLanding("")
        setNight_to("")
        setFullStop("")
        setTouchGo("")
        setWaterLanding("")
        setWater_to("")
        setApproach1("")
        setRemark("")
        setModalVisible(false);
        setRosterFrom('')
        setRosterChocksOff('')
        setRosterTo('')
        setRosterChocksOn('')
        setRosterAType("")
        setRosterAId('')
        setRosterNamePic('')
        setRosterDayLand('')
        setRosterNightLand('')
        setRosterDayTakeOff('')
        setRosterNightTakeOff('')
        setRosterToLat('')
        setRosterFromLat('')
        setRosterFromParams("")
        setTotalTime('')
        setfilghtTimeM('')
        setDayTime('')
        setNightTime('')
        setRosterNameSic('')
    }

    const logic = (P1, P2) => {
        if (P1 === 'Self') {
            P1 = rosterNamePic
            P2 != 'Self'
            return P1
        }
        else if (P2 === 'Self') {
            P2 = listP2
            rosterNamePic = ''
            return P2
        }
    }

    const flightDate = (event, selectedDate) => {
        const currentDate = selectedDate || rosterDate;
        setShow(Platform.OS === 'ios');
        setRosterDate(currentDate)
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const STL_CONDITIONS = () =>  {
        if (stl === false && rosterNameSic==='Self') {
            setP1_us_day(sic_day)
            setP1_us_night(sic_night)
            setSic_day ('')
            setSic_night('')
            setP1_ut_day('')
            setP1_ut_night('')
            setDual_day('')
            setDual_night('')
            
        }
        else if (stl === true && rosterNameSic==='Self') {
            setP1_us_day('')
            setP1_us_night('')
            setSic_day (dayTime)
            setSic_night(nightTime)
            setP1_ut_day('')
            setP1_ut_night('')
            setDual_day('')
            setDual_night('')
        }
    }

    const nanRemovable = () => {
        if(rosterNamePic==='Self'){
            isNaN(p1_us_day)===true?setP1_us_day(''):p1_us_day
        }
    }
    React.useEffect(() => {
        if (rosterNamePic) {
            nanRemovable()}}
        , [rosterNamePic]);

    const originalDate = datee == 'DDMM' ? ddmmyy : mmddyy;
    
    const ServeroriginalDate = datee == 'DDMM' ? Serverddmmyy : Servermmddyy;

    const sicDayControl = (inputText) => {
        setSic_day(inputText)
        setDayTime(inputText)
        
    }

    const sicNightControl = (inputText) => {
        setSic_night(inputText)
        setNightTime(inputText)
        // if (nightTime){
        // night_editable()
        // }
    }

    const SimuCalculations = () => {
        if (rosterAId === 'SIMU') {
            var t1 = landing
            var t2 = takeOff
            var t1parts = t1.split(':');    
            var t1cm=Number(t1parts[0])*60+Number(t1parts[1]);
    
            var t2parts = t2.split(':');    
            var t2cm=Number(t2parts[0])*60+Number(t2parts[1]);
    
            var hour =Math.floor((t1cm-t2cm)/60);  
            if (hour < 10) { hour = "0" + hour; }  
            var min=Math.floor((t1cm-t2cm)%60); 
            //var m = (Math.round(min/15) * 15) % 60;
            if (min < 10) { min = "0" + min; }  
            setfilghtTimeM(hour+':'+min)
        }
        else {
            setfilghtTimeM(filghtTimeM)
        }
    }

    React.useEffect(() => {
        if (rosterAId === 'SIMU') {
         SimuCalculations()}}, [rosterAId, SimuCalculations]);

    const A = getReduxApproachData.ApproachNo === undefined ? 1 : getReduxApproachData.ApproachNo;
    const B = getReduxApproachData.ApproachType === undefined ? 'ILS' : getReduxApproachData.ApproachType

     const Approach1 = A+';'+B+';'+rosterTo;

     const ut_control = () => {
         setP1_us_day('')
         setP1_us_night('')
         setSic_day('')
         setSic_night('')
         setP1_ut_day(dayTime)
         setP1_ut_night(nightTime) 
         setDual_day('')
         setDual_night('') 
     } 

     const us_control = () => {
        setP1_us_day(dayTime)
        setP1_us_night(nightTime)
        setSic_day('')
        setSic_night('')
        setP1_ut_day('')
        setP1_ut_night('')
        setDual_day('')
        setDual_night('') 
    }

    const dual_control = () => {
        setP1_us_day('')
        setP1_us_night('')
        setSic_day('')
        setSic_night('')
        setP1_ut_day('')
        setP1_ut_night('') 
        setDual_day(dayTime)
        setDual_night(nightTime)
    }

     const returnTrip = () => {
         if(!originalDate || rosterAType.length===1 || !rosterFrom || !rosterTo && !rosterChocksOff || !rosterChocksOn){
             alert('Please Fill mandatory fields');
             setModalVisible(false)
         }
         else {
             setRosterFrom(rosterTo)
             setRosterTo(rosterFrom)
             setModalVisible(false)
         }
     }

     const nextLeg = () => {
        if(!originalDate || rosterAType.length===1 || !rosterFrom || !rosterTo && !rosterChocksOff || !rosterChocksOn){
            alert('Please Fill mandatory fields');
            setModalVisible(false)
        }
        else {
            setRosterFrom(rosterTo)
            setRosterTo('')
            setModalVisible(false)
            setRosterChocksOff('')
            setRosterChocksOn('')
        }
    }

    const SelectEGCADETAILS = async() => {
        let user = await AsyncStorage.getItem('userdetails');
        user = JSON.parse(user);
        let selectedData = []; 
        prePopulateddb.transaction(tx => {
            tx.executeSql(
                'SELECT * from EGCADetails WHERE user_id = "'+user.id+'"', [], (tx, result) => {
                    for (let i = 0; i <= result.rows.length; i++) {
                    selectedData.push({
                      FlightType :  result.rows.item(i).FlightType,
                    });
                        setFlightType(result.rows.item(i).FlightType)
                    }
                }
            );
        });
    } 
    

    React.useEffect(() => {
        if(isFocused){
        SelectEGCADETAILS()
        }
      },[isFocused]);

    const PurposeData = flightType==='Training'? training : flightType==='Test'? test : flightType==='Commercial'?commercial:[]

   const isFlightTypeSelected = () => {
       alert('Please Fill egcaUpload details first from settings-> EGCA Upload to proceed!!')
       navigation.navigate('EGCAUpload')
   }

   const SaveChocksOff = async(inputText) => {
    console.log('inputText',inputText)
    if(isFocused){
    let user = await AsyncStorage.getItem('userdetails');
    user = JSON.parse(user);
    let syncChocksOff =  []
    prePopulateddb.transaction(tx => {
        if(inputText!==undefined){
        tx.executeSql('UPDATE logbook set savedChocksOff="'+inputText+'" where user_id="'+user.id+'"')
        console.log('UPDATE logbook set savedChocksOff="'+inputText+'" where user_id="'+user.id+'"')
        }
        tx.executeSql('SELECT savedChocksOff FROM logbook Where user_id = "'+user.id+'"', [], (tx, result) => {
            for (let i = 0; i <= result.rows.length; i++) {
                syncChocksOff.push({
                    savedChocksOff: result.rows.item(i).savedChocksOff,
                })
                //console.log('saved Chocks Off', result.rows.item(i).savedChocksOff)
                if(params.RoasterChocksOff===''){
                    setRosterChocksOff(result.rows.item(i).savedChocksOff)
                    setSavedChocksOff(result.rows.item(i).savedChocksOff)
                }
                // else if(rosterChocksOff===''){
                //     setRosterChocksOff(params.RoasterSavedChocksOff)
                // }
             }
        })
        });
    }
}
React.useEffect(()=>{
    if(isFocused){
        //console.log('chocksOffTime',rosterChocksOff)
        SaveChocksOff()
    }
},[isFocused])

React.useEffect(()=>{
        if(params.RoasterChocksOff==='' && rosterChocksOff===''){
            console.log('dfd',savedChocksOff)
            setRosterChocksOff(savedChocksOff)
        }
},[rosterChocksOff])
   

   return (
        <KeyboardAvoidingView behavior= {Platform.OS === 'ios' ? "padding" : null}>
        
        <ScrollView contentContainerStyle={{paddingBottom: 60}}>
        <SafeAreaView style={modalVisible || FlightmodalVisible || TimemodalVisible || LandingmodalVisible || ApproachmodalVisible || FlightAlertmodalVisible || TimeAlertmodalVisible || AppAlertmodalVisible || lndgAlertmodalVisible || importModal || RostermodalVisible ? {...Logbook.container, ...{backgroundColor: 'rgba(0,0,0,0.4)'}} : [Logbook.container, {backgroundColor: theme.backgroundColor}]}>

        <View style={styles.header}>
        <MaterialCommunityIcons name="arrow-left" color={'#fff'} size={20} style={{padding:6}} onPress={()=>navigation.navigate('LogBookListing')} />
        <Text style={styles.aircrafts}>LogBook</Text>
        {config?<TouchableOpacity style={{paddingLeft:150}} onPress={HideDoneConfig}><Text style={{color:'#fff'}}>Done config</Text></TouchableOpacity>:null}
        </View>

        <View style={SsStyle.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={FlightAlertmodalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setFlightAlertModalVisible(!FlightAlertmodalVisible);
                }}
            >
                <View style={SsStyle.centeredView}>
                <View style={dark?SsStyle.DarkModalView:SsStyle.modalView}>
                    <View style={{width:'100%', backgroundColor:dark?'#000':'#EFEFEF', padding:5, flexDirection:'row', justifyContent:'space-between',borderRadius : 10}}>
                    <Text style={SsStyle.modalText}>Flight</Text>
                    <MaterialCommunityIcons  
                    name="close" color='#256173' size={25} style={{padding: 5,}} onPress={() => setFlightAlertModalVisible(!FlightAlertmodalVisible)} />
                    </View>
                    <ScrollView>
                        <Text style={dark?{...SsStyle.mainText,...{color:'#fff'}}:SsStyle.mainText}>
                        1. ECREW - Import your logbook / Roster. Make sure you have fed the User ID, Password and Airline in Settings - Ecrew menu. {'\n'}
                        2. CONFIG- Use this button to add/remove fields from Logbook page. Select Air Section Choices in each logbook section to Update your data. Config button is available in the Burger Menu on the Bottom All right. Check the Youtube video for the (Tsame in <Text style={{ color: 'blue' }} onPress={() => Linking.openURL('https://youtu.be/DYMOUqeJY30')}>https://youtu.be/DYMOUqeJY30</Text>. Do not forget to select DONE on completion{'\n'}
                        3. DELETE- Swipe a flight left to DELETE a flight.{'\n'}
                        4. AIRCRAFT TYPE - Create your own aircraft type by pressing the info button. {'\n'}
                        5. AIRFIELD search can be by ICAO/IATA or CITY name too by selecting ALL. Use Mine to feed data for self defined airfield. If Lat/ Long are not fed, then all flight time will be defaulted to Day.{'\n'}
                        6. Use the Config button to fill names of Reserve Crew in Long Haul Flights. For Air La India, these names are stored automatically.{'\n'}
                        7. Use the CUSTOM fields in each section to store any special data of your choice as per your imagination. For example, some like to store the name of their LEAD in the name CUSTOM field. CUSTOM field in this menu will only accept Alphabet entries.
                        CUSTOM field in TIME menu will only accept hh:mm entries. Use Landing CUSTOM field for numeric values.{'\n'}
                        8. Names/ Photos of Colleagues can be stored by selecting Info button in front of the name. Mention suitable Remarks for improved CRM or FAQ's from Instructor's. {'\n'}
                        9. * marked fields are mandatorily required to be added.{'\n'}
                        <Text style={{ color: 'blue' }} onPress={() => Linking.openURL('https://youtu.be/alh9lm1tzoY')}>(https://youtu.be/alh9lm1tzoY)</Text>
                        </Text>
                    </ScrollView>
                </View>
                </View>
            </Modal>
            </View>

            <View style={SsStyle.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={TimeAlertmodalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setTimeAlertModalVisible(!TimeAlertmodalVisible);
                }}
            >
                <View style={SsStyle.centeredView}>
                <View style={dark?SsStyle.DarkModalView:SsStyle.modalView}>
                    <View style={{width:'100%', backgroundColor:dark?'#000':'#EFEFEF', padding:5, flexDirection:'row', justifyContent:'space-between',borderRadius :10}}>
                    <Text style={SsStyle.modalText}>Time</Text>
                    <MaterialCommunityIcons  
                    name="close" color='#256173' size={25} style={{padding: 5,}} onPress={() => setTimeAlertModalVisible(!TimeAlertmodalVisible)} />
                    </View>
                    <ScrollView>
                        <Text style={dark?{...SsStyle.mainText,...{color:'#fff'}}:SsStyle.mainText}>
                        1. Day/Night time - App calculates this automatically. You can change them. Simply change the values in Day or Night row. It will reflect automatically everywhere else.{'\n'}

                        2. Long Haul Flights - Change the Total time to log your Control time for Long Haul Flights. The changed Total time will be shown in RED to indicate the difference from Block time.{'\n'}

                        3. Cross Country, Instructional and Instrument hours can be added automatically to a flight if selected in Settings {'>>>'} Default Section.{'\n'}

                        4. STL - First Officers can select STL to automatically prepare your STL logbook for ATPL. Hours will be shown in P2 in the logbook but in P1 U/S in STL logbook in DOCS menu.{'\n'}

                        5. DUAL time should be filled for Single Engine aircraft. P1 U/T Day/ Night for Multi Engine Aircraft.{'\n'}

                        6. Use the Custom Field to store any special data of your choice like BLOCK times. These block times can be seen for the month automatically in the Quick{'\n'}
                        
                        7. CUSTOM field in TIME menu will only accept hh:mm entries. Use Landing CUSTOM field for numeric values.{'\n'}

                        <Text style={{ color: 'blue' }} onPress={() => Linking.openURL('https://youtu.be/ZrryH-qF8Qs')}>(https://youtu.be/ZrryH-qF8Qs)</Text>
                        </Text>
                    </ScrollView>
                </View>
                </View>
            </Modal>
            </View>
            <View style={SsStyle.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={AppAlertmodalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setAppAlertModalVisible(!AppAlertmodalVisible);
                }}
            >
                <View style={SsStyle.centeredView}>
                <View style={dark?SsStyle.DarkModalView1:SsStyle.modalView1}>
                    <View style={{width:'100%', backgroundColor:dark?'#000':'#EFEFEF', padding:5, flexDirection:'row', justifyContent:'space-between',borderRadius :10}}>
                    <Text style={SsStyle.modalText}>Approaches</Text>
                    <MaterialCommunityIcons  
                    name="close" color='#256173' size={25} style={{padding: 5,}} onPress={() => setAppAlertModalVisible(!AppAlertmodalVisible)} />
                    </View>
                    <View>
                        <Text style={dark?{...SsStyle.mainText,...{color:'#fff'}}:SsStyle.mainText}>
                        1. ILS approach at the Destination is filled automatically. Select the field to fill in the Runway or change the approach type. {'\n'}

                        2. CUSTOM field can be used to add additional approaches flown.{'\n'}

                        3. Add Remarks in flights like Annual Route Check, SLF, Clearance for Airfields. These will be reflected in the Remarks column of the printed Logbook. Keep them short.
                        </Text>
                    </View>
                </View>
                </View>
            </Modal>
            </View>
            <View style={SsStyle.centeredView}>
            <Modal
                animationType="fade"
                transparent={true}
                visible={lndgAlertmodalVisible}
                onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setlndgAlertModalVisible(!lndgAlertmodalVisible);
                }}
            >
                <View style={SsStyle.centeredView}>
                <View style={dark?SsStyle.DarkModalView:SsStyle.modalView}>
                    <View style={{width:'100%', backgroundColor:dark?'#000':'#EFEFEF', padding:5, flexDirection:'row', justifyContent:'space-between', borderRadius :10}}>
                    <Text style={SsStyle.modalText}>Landing</Text>
                    <MaterialCommunityIcons  
                    name="close" color='#256173' size={25} style={{padding: 5,}} onPress={() => setlndgAlertModalVisible(!lndgAlertmodalVisible)} />
                    </View>
                    <View>
                        <Text style={dark?{...SsStyle.mainText,...{color:'#fff'}}:SsStyle.mainText}>
                        1. Day or Night Landing is automatically filled based on Take-off / Landing time. {'\n'}
                        2. CUSTOM fields can be used for selecting TOWS, IN FLIGHT REFUELLING connects etc. CUSTOM field in this section will accept only NUMERIC values.
                        </Text>
                    </View>
                </View>
                </View>
            </Modal>
            </View>
            
            <ScrollView>
                    <View style= {modalVisible || FlightmodalVisible || TimemodalVisible || LandingmodalVisible || ApproachmodalVisible || FlightAlertmodalVisible || TimeAlertmodalVisible || AppAlertmodalVisible || lndgAlertmodalVisible || importModal || RostermodalVisible ? {...Logbook.headline, ...{backgroundColor: 'rgba(0, 0, 0, 0)'}} : dark ? Logbook.Darkheadline:Logbook.headline}>
                        <Text style={dark?Logbook.DarkHeadlineText:Logbook.HeadlineText}>Flight</Text>
                        <MaterialCommunityIcons  
                        name="help-circle-outline" color='#256173' size={25} onPress={() => setFlightAlertModalVisible(true)} style={{lineHeight:45, position:'absolute', left: 350 }} />
                    </View>

                <TouchableOpacity onPress={showDatepicker} >
                    <View style={Logbook.fieldWithoutBottom}>
                        <View style={Logbook.fields}>
                            <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}><Text style={{ color: 'red' }}>*</Text>Date</Text>
                            
                            {show && (
                                <DatePicker
                                //style={styles.datePickerStyle}
                                date={rosterDate} // Initial date from state
                                mode="date" // The enum of date, datetime and time
                                placeholder="From"
                                placeholderTextColor = "#266173"
                                format= "DD-MM-YYYY"
                                //minDate="01-01-2016"
                                //maxDate="01-01-2019"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                suffixIcon={null}
                                customStyles={{
                                    dateInput: {
                                    borderWidth:0.2,
                                    borderRadius: 15,
                                    borderColor: '#EFEFEF',
                                    width: '100%',
                                    backgroundColor: '#fff',
                                    },
                                    dateIcon: {
                                    width:40,
                                    height:40,
                                    },
                                }}
                                hideText={true}
                                onDateChange={flightDate}
                                />
                            )}
                            {/* <Text style={{paddingTop:8}}>{onlyDate}</Text> */}
                            <Text style={dark?{ paddingTop: 8, color:'#fff' }:{ paddingTop: 8 }}>{originalDate}</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                {flightToggle == true && aircraftId!== 'SIMU' ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}>Flight</Text>
                        <TextInput
                            placeholder='Flight'
                            placeholderTextColor='grey'
                            value={flight}
                            onChangeText={(inputText)=>setFlight(inputText)}
                            style={dark?{ marginTop: -5, color:'#fff' }:{ marginTop: -5 }} />
                    </View>
                </View> : null}

                <TouchableOpacity onPress={()=>navigation.navigate('Aircraft', { fromScreenLogbook: 'createLogBook' })}>
                    <View style={Logbook.fieldWithoutBottom}>
                        <View style={Logbook.fields}>
                            <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}><Text style={{ color: 'red' }}>*</Text>Aircraft Type</Text>
                            <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                                <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35 } }}>{rosterAType}</Text>
                                {/* <TouchableOpacity onPress={() => { navigation.navigate('SetAircraft', {itemAtype : rosterAType , itemAId : rosterAId , from : 'ATCreateLogbook'  }) }}>
                                    <MaterialCommunityIcons
                                        name="alert-circle-outline" color={'#256173'} size={25} style={{ lineHeight: 35 }} />
                                </TouchableOpacity>  */}
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

                <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, ...{paddingBottom:8}} }}><Text style={{ color: 'red' }}>*</Text>Aircraft ID</Text>
                        <View style={{justifyContent:'flex-end',position:'absolute',left:0,bottom:0}}>
                        <Text style={{ fontSize: 10, paddingLeft: 25 }}>
                            (Type "SIMU" for Simulator Menu)
                        </Text>
                        </View>
                        <TextInput
                            autoCapitalize={'characters'}
                            placeholder='Aircraft ID'
                            placeholderTextColor='grey'
                            value={rosterAId==='undefined'?'':rosterAId.toUpperCase()}
                            onChangeText={(inputText) => setRosterAId(inputText)}
                            keyboardType= "default"
                            style={{color:dark?'#fff':'#000'}} 
                            />
                    </View>
                </View>

                {STToggle && rosterAId === 'SIMU' ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{...Logbook.fieldText,...{ lineHeight: 35,}}}>Simulator Type</Text>
                        <TextInput
                            placeholder='Simulator Type'
                            placeholderTextColor='grey'
                            value={St}
                            onChangeText={(St) => setSt(St)}
                            style={dark?{ marginTop: -5,color:'#fff' }:{ marginTop: -5 }} />
                    </View>
                </View> : null}

                <TouchableOpacity onPress={() => navigation.navigate('Destination', { from: 'From' })}>
                    <View style={Logbook.fieldWithoutBottom}>
                        <View style={Logbook.fields}>
                            <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}><Text style={{ color: 'red' }}>*</Text>From</Text>
                            <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                                <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35 } }}>{rosterFrom}</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('SetDestination', { from: 'From' })}>
                                    <MaterialCommunityIcons
                                        name="alert-circle-outline" color={'#256173'} size={25} style={{ lineHeight: 35 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Destination', { from: 'to' })}>
                    <View style={Logbook.fieldWithoutBottom}>
                        <View style={Logbook.fields}>
                            <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}><Text style={{ color: 'red' }}>*</Text>To</Text>
                            <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                                <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35 } }}>{ rosterTo }</Text>
                                <TouchableOpacity onPress={() => navigation.navigate('SetDestination', { from: 'to' })}>
                                    <MaterialCommunityIcons
                                        name="alert-circle-outline" color={'#256173'} size={25} style={{ lineHeight: 35 }} />
                                </TouchableOpacity>
                            </View>
                        </View>  
                    </View>
                </TouchableOpacity>

                {rosterAId === 'SIMU' && (<View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}>Location<Text style={{ color: 'red' }}>*</Text></Text>
                        {/* <Text style={{fontSize:10,}}>(Type "SIMU" for Simulator Menu)</Text> */}
                        <TextInput
                            placeholder='Location'
                            placeholderTextColor='grey'
                            value={location}
                            onChangeText={(location) => setLocation(location)}
                            style={dark?{ marginTop: -5, color:'#fff' }:{ marginTop: -5 }} />
                    </View>
                </View>)}

                {rosterAId === 'SIMU' && (<View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}>Sim_exercise</Text>
                        {/* <Text style={{fontSize:10,}}>(Type "SIMU" for Simulator Menu)</Text> */}
                        <TextInput
                            placeholder='Sim_exercise'
                            placeholderTextColor='grey'
                            value={Sim_exercise}
                            onChangeText={(Sim_exercise) => setSim_exercise(Sim_exercise)}
                            style={dark?{ marginTop: -5,color:'#fff' }:{ marginTop: -5 }} />
                    </View>
                </View>)}

                {rosterAId !== 'SIMU' && (<View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}><Text style={{ color: 'red' }}>*</Text>Chocks Off</Text>
                        <MaskedTextInput
                            mask='99:99'
                            value={ rosterChocksOff }
                            onChangeText={inputText => {setRosterChocksOff(inputText);SaveChocksOff(inputText)}}
                            keyboardType="numeric"
                            placeholder="hh:mm"
                            placeholderTextColor='grey'
                            style={dark?{color:'#fff'}:{color:'#000'}}
                        />
                    </View>
                </View>)}

                {takeOffToggle1 === true || rosterAId === "SIMU"?<View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}>Take-Off </Text>
                        <MaskedTextInput
                            mask='99:99'
                            value={ rosterAId !== 'SIMU'? null : takeOff}
                            onChangeText={inputText => setTakeOff(inputText)}
                            keyboardType="numeric"
                            placeholder="hh:mm"
                            placeholderTextColor='grey'
                            style={dark?{color:'#fff'}:{color:'#000'}}
                        />
                    </View>
                </View>:null}

                {landingToggle1 === true || rosterAId==="SIMU"?<View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}>Landing </Text>
                        <MaskedTextInput
                            mask='99:99'
                            value={rosterAId !== 'SIMU'? null : landing}
                            onChangeText={inputText => setLanding(inputText)}
                            keyboardType="numeric"
                            placeholder="hh:mm"
                            placeholderTextColor='grey'
                            style={dark?{color:'#fff'}:{color:'#000'}}
                        />
                    </View>
                </View>:null}

                {rosterAId!== 'SIMU' && (<View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}><Text style={{ color: 'red' }}>*</Text>Chocks On</Text>
                        <MaskedTextInput
                            mask='99:99'
                            value={rosterChocksOn }
                            onChangeText={inputText => setRosterChocksOn(inputText)}
                            keyboardType="numeric"
                            placeholder="hh:mm"
                            placeholderTextColor='grey'
                            style={dark?{color:'#fff'}:{color:'#000'}}
                        />
                    </View>
                </View>)}

                {/* end of chocks-on/chocks-off */}

                {routeToggle && rosterAId!== 'SIMU' ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}>Route</Text>
                        <TextInput
                            placeholder='Route'
                            placeholderTextColor='#393F45'
                            value={Listparams.itemRoute ? listRoute : route}
                            onChangeText={(inputText) => setRoute(inputText)}
                            style={dark?{ marginTop: -5, color:'#fff' }:{ marginTop: -5 }} />
                    </View>
                </View> : null}

                {config && rosterAId!== 'SIMU' ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, color: dark?'#fff':'blue' } }}>Select Choices....</Text>
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Configuration', { from: 'flight1', toggled: params.flight })}>
                                <MaterialCommunityIcons
                                    name="chevron-right" color={'#256173'} size={25} style={{ lineHeight: 35 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View> : null}

                {instructorToggle === true ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}>Instructor</Text>
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                            <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35 } }}>{ listInstructor }</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('People', { from: 'instructor' })}>
                                <MaterialCommunityIcons
                                    name="chevron-right" color={'#256173'} size={25} style={{ lineHeight: 35 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View> : null}

                {Pic_toggle && rosterAId!== 'SIMU' ? <TouchableOpacity onPress={() => {navigation.navigate('People', { from: 'pic' })}}>
                    <View style={Logbook.fieldWithoutBottom}>
                        <View style={Logbook.fields}>
                            <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35,paddingHorizontal:5 } }}><Text style={{ color: 'red' }}>*</Text>PIC/P1</Text>
                            <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                                <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35 } }}>{rosterNamePic === 'undefined' ?'':rosterNamePic}</Text>
                                <TouchableOpacity onPress={() => {navigation.navigate('People', { from: 'pic' })}}>
                                    <MaterialCommunityIcons
                                        name="chevron-right" color={'#256173'} size={25} style={{ lineHeight: 35 }} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity> : null}

                {rc1Toggle ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}>Relief Crew 1</Text>
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                            <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35 } }}>{reliefCrew1}</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('People', { from: 'rc1' })}>
                                <MaterialCommunityIcons
                                    name="chevron-right" color={'#256173'} size={25} style={{ lineHeight: 35 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View> : null}

                {rc2Toggle ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}>Relief Crew 2</Text>
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                            <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35 } }}>{reliefCrew2}</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('People', { from: 'rc2' })}>
                                <MaterialCommunityIcons
                                    name="chevron-right" color={'#256173'} size={25} style={{ lineHeight: 35 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View> : null}

                {rc3Toggle ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}>Relief Crew 3</Text>
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                            <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35 } }}>{reliefCrew3}</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('People', { from: 'rc3' })}>
                                <MaterialCommunityIcons
                                    name="chevron-right" color={'#256173'} size={25} style={{ lineHeight: 35 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View> : null}

                {rc4Toggle ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}>Relief Crew 4</Text>
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                            <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35 } }}>{reliefCrew4}</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('People', { from: 'rc4' })}>
                                <MaterialCommunityIcons
                                    name="chevron-right" color={'#256173'} size={25} style={{ lineHeight: 35 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View> : null}

                {sic_toggle && rosterAId!== 'SIMU' ?<TouchableOpacity onPress={() => {navigation.navigate('People', { from: 'sic' })}}><View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{...Logbook.fieldText,...{ paddingHorizontal:5}}}><Text style={{ color: 'red' }}>*</Text>SIC/P2</Text>
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                            <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, ...{alignItems:'center', lineHeight: 20,} } }}>{rosterNameSic}</Text>
                            <TouchableOpacity onPress={() => {navigation.navigate('People', { from: 'sic' })}}>
                                <MaterialCommunityIcons
                                    name="chevron-right" color={'#256173'} size={25} style={{ lineHeight: 35,}} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View></TouchableOpacity>: null}

                    {flightType !== "Non-commercial" ?<View>
                    <Text style = {dark?styles.DarkInnnerHeadings:styles.InnnerHeadings}>Purpose</Text>
                    </View>: null}

                {flightType !== "Non-commercial" ? <View style={Platform.OS==='ios'?{padding: 20,zIndex:888}:{padding:20,}}>
                    <DropDownPicker
                        mode="BADGE"
                        zIndex={3000}
                        zIndexInverse={1000}
                        searchable={true}
                        multiple={true}
                        min={0}
                        max={5}
                        open={open}
                        value={PurposeData}
                        items={flightType === "Training" ? trainingValue : flightType === "Test" ? testValue : flightType === "Commercial" ? commercialValue : []}
                        setOpen={setOpen}
                        setValue={ flightType === "Training" ? setTraining : flightType === "Test" ? setTest : flightType === "Commercial" ? setCommercial : ''}
                        setItems={ flightType === "Training" ? setTrainingValue : flightType === "Test" ? setTestValue : flightType === "Commercial" ? setCommercialValue : []}
                        placeholder="Select *"
                        style = {{flex:1,width: '100%', flexWrap:'wrap'}}
                        onPress={(open) => {console.log('was the picker open?', open); flightType===''?isFlightTypeSelected():null}}
                        dropDownContainerStyle={{
                        width: '100%',
                        elevation: 15,
                    }}
                    listMode="SCROLLVIEW"
                    selectedItemLabelStyle={{
                        fontWeight: "bold"
                      }}
                      selectedItemContainerStyle={{
                        backgroundColor: "grey"
                      }}
                      badgeStyle={{
                        //padding:5,
                      }}
                      badgeColors={["red", "green", "orange"]}
                      showBadgeDot={false}
                      listItemContainer={{
                        height: 100
                      }}
                      badgeSeparatorStyle={{
                        width: 5
                      }}
                    />
                    </View> : null}
                    

                {studentToggle ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}>Student</Text>
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                            <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35 } }}>{student}</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('People', { from: 'student' })}>
                                <MaterialCommunityIcons
                                    name="chevron-right" color={'#256173'} size={25} style={{ lineHeight: 35 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View> : null}

                {textInput.map((value) => {
                return value
                })}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={FlightmodalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setFlightModalVisible(!FlightmodalVisible);
                    }}
                >
                    <View style={ModalView.FlightcenteredView}>
                        <View style={ModalView.flightModalView}>
                            
                            <View style={{paddingVertical:10, alignItems: 'center'}}>
                            <MaterialCommunityIcons name="check-circle-outline" color={'#000'} size={50} style={{}}/>
                            <Text style={styles.modalText} onPress={removeTextInput}>Set Title</Text>
                            </View>

                            <View style={{backgroundColor: '#EFEFEF', width:'100%', alignItems:'center',padding:10,borderRadius:10}}>
                            <Text style={ModalView.modalText}>Set Name for custom field</Text>
                            <TextInput
                                placeholder='Name'
                                placeholderTextColor='#D0D0D0'
                                style={ModalView.modalViewTextInput} 
                                value={FilterCustom}
                                onChangeText={(text)=>setFilterCustom(text)}
                                />
                            
                            <View style={{ flexDirection:'row', justifyContent:'space-between', padding:10 }}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => {addTextInput(textInput.length)}}>
                                    <Text style={styles.textStyle}>OK</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setFlightModalVisible(!FlightmodalVisible)}>
                                    <Text style={styles.textStyle}>CANCEL</Text>
                                </Pressable>
                            </View>
                            </View>
                           
                         
                         </View>
                    </View>
                </Modal>


                {config && rosterAId !== 'SIMU' ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, color: dark?'#fff':'blue' } }}>Select Choices....</Text>
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                            {/* <Text style={{...Logbook.fieldText, ...{lineHeight:35}}}>Select Choices....</Text> */}
                            <TouchableOpacity onPress={() => navigation.navigate('Configuration', { from:'flight2' })}>
                                <MaterialCommunityIcons
                                    name="chevron-right" color={'#256173'} size={25} style={{ lineHeight: 35 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View> :
                    <View style={Logbook.fieldWithoutBottom}>
                        {rosterAId!== 'SIMU' && (<View style={Logbook.fields}>
                            <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}>Custom</Text>
                            <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => setFlightModalVisible(true)}>
                                    <MaterialCommunityIcons
                                        name="plus-circle" color={'#256173'} size={25} style={{ lineHeight: 35 }} />
                                </TouchableOpacity>
                            </View>
                        </View>)}
                    </View>}

                {/* Time */}

                {rosterAId !== 'SIMU' && (<View style= {modalVisible || FlightmodalVisible || TimemodalVisible || LandingmodalVisible || ApproachmodalVisible || FlightAlertmodalVisible || TimeAlertmodalVisible || AppAlertmodalVisible || lndgAlertmodalVisible || importModal || RostermodalVisible ? {...Logbook.headline, ...{backgroundColor: 'rgba(0, 0, 0, 0)'}} : dark ? Logbook.Darkheadline:Logbook.headline}>
                    <Text style={dark?Logbook.DarkHeadlineText:Logbook.HeadlineText}>Time</Text>
                    <MaterialCommunityIcons  
                name="help-circle-outline" color='#256173' size={25} onPress={() => setTimeAlertModalVisible(true)} style={{lineHeight:45, position:'absolute', left: 350 }} />
                </View>)}

                {totalTimeToggle ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}>Total Time</Text>
                        <MaskedTextInput
                            mask='99:99'
                            value={filghtTimeM}
                            onChangeText={inputText => setfilghtTimeM(inputText)}
                            keyboardType="numeric"
                            placeholder="hh:mm"
                            placeholderTextColor='grey'
                            style={{color:dark?'#fff':'#000'}}
                        />
                    </View>
                </View> : null}

                {PFToggle && rosterAId === 'SIMU' ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}>PF Hours</Text>
                        <MaskedTextInput
                            mask='99:99'
                            value={pfHours}
                            onChangeText={(pfHours) => setPfHours(pfHours)}
                            keyboardType="numeric"
                            placeholder="hh:mm"
                            placeholderTextColor='grey'
                            style={{color:dark?'#fff':'#000'}}
                        />
                    </View>
                </View> : null}

                {PMToggle && rosterAId === 'SIMU' ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}>PM Hours</Text>
                        <MaskedTextInput
                            mask='99:99'
                            value={pmHours}
                            onChangeText={pmHours => setPmHours(pmHours)}
                            keyboardType="numeric"
                            placeholder="hh:mm"
                            placeholderTextColor='grey'
                            style={{color:dark?'#fff':'#000'}}
                        />
                    </View>
                </View> : null}

                {SFToggle && rosterAId === 'SIMU' ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}>SFI/SFE</Text>
                        <MaskedTextInput
                            mask='99:99'
                            value={sf}
                            onChangeText={sf => setSf(sf)}
                            keyboardType="numeric"
                            placeholder="hh:mm"
                            placeholderTextColor='grey'
                            style={{color:dark?'#fff':'#000'}}
                        />
                    </View>
                </View> : null}

                {dayToggle && rosterAId !== 'SIMU' ?<View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}>Day</Text>
                        <MaskedTextInput
                            mask='99:99'
                            value={dayTime}
                            onChangeText = {(dayTime)=>day_editable(dayTime)}
                            keyboardType="numeric"
                            placeholder="hh:mm"
                            placeholderTextColor='grey'
                            style={{color:dark?'#fff':'#000'}}
                        />
                    </View>
                </View> : null}

                {nightToggle && rosterAId !== 'SIMU' ?<View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}>Night</Text>
                        <MaskedTextInput
                            mask='99:99'
                            value={nightTime}
                            onChangeText = {(nightTime)=>night_editable(nightTime)}
                            keyboardType="numeric"
                            placeholder="hh:mm"
                            placeholderTextColor='grey'
                            style={{color:dark?'#fff':'#000'}}
                        />
                    </View>
                    </View>: null}

                {AiToggle && rosterAId !== 'SIMU' ?<View style={Logbook.fieldWithoutBottom}>
                    
                    <View style={Logbook.fields}>
                    <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}>Actual Instrument</Text>
                        <MaskedTextInput
                            mask='99:99'
                            value={ai}
                            onChangeText={getReduxDisplayData.ActualI===undefined || getReduxDisplayData.ActualI===false?(inputText)=>setAi(inputText):CalcActualInstrument}
                            keyboardType="numeric"
                            placeholder="hh:mm"
                            placeholderTextColor='grey'
                            style={{color:dark?'#fff':'#000'}}
                        />
                    </View>
                   
                </View> : null}

                {dualDayToggle === true && rosterAId !== 'SIMU' ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}>Dual (Day)</Text>
                        <MaskedTextInput
                            mask='99:99'
                            value={dual_day}
                            onChangeText={inputText => setDual_day(inputText)}
                            keyboardType="numeric"
                            placeholder="hh:mm"
                            placeholderTextColor='grey'
                            style={{color:dark?'#fff':'#000'}}
                            onFocus = {dual_control}
                        />
                    </View>
                </View> : null}

                {dualNightToggle === true && rosterAId !== 'SIMU' ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}>Dual (Night)</Text>
                        <MaskedTextInput
                            mask='99:99'
                            value={dual_night}
                            onChangeText={inputText => setDual_night(inputText)}
                            keyboardType="numeric"
                            placeholder="hh:mm"
                            placeholderTextColor='grey'
                            style={{color:dark?'#fff':'#000'}}
                            onFocus = {dual_control}
                        />
                    </View>
                </View> : null}

                {instructionalToggle === true && rosterAId !== 'SIMU'  ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}>Instructional</Text>
                        <MaskedTextInput
                            mask='99:99'
                            value={instructional}
                            onChangeText={inputText => setInstructional(inputText)}
                            keyboardType="numeric"
                            placeholder="hh:mm"
                            placeholderTextColor='grey'
                            style={{color:dark?'#fff':'#000'}}
                        />
                    </View>
                </View> : null}

                {/* IFR/VFR */}
                {ifr_vfrToggle && rosterAId !== 'SIMU' ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fieldsRadio}>

                        <View style={{ flexDirection: 'row', }}>
                            <RadioButton.Group value={fr}
                                onValueChange={fr => setFr(fr)}>
                                <RadioButton.Android
                                    value="ifr"
                                    status={fr === 'ifr' ? 'checked' : 'unchecked'}
                                    onPress={() => setFr('ifr')}
                                    color='#256173'
                                    uncheckedColor='#256173'
                                    labelStyle={{ marginRight: 20 }}
                                />
                            </RadioButton.Group>
                            <Text style={Logbook.fieldTextRadio}>IFR</Text>
                        </View>
                        <View style={{ flexDirection: 'row', }}>
                            <RadioButton.Group value={fr}
                                onValueChange={fr => setFr(fr)}>
                                <RadioButton.Android
                                    value="vfr"
                                    //status={ fr === 'vfr' ? 'checked' : 'unchecked' }
                                    //onPress={() => setFr('vfr')}
                                    color='#256173'
                                    uncheckedColor='#256173'
                                    labelStyle={{ marginRight: 20 }}
                                />
                            </RadioButton.Group>
                            <Text style={Logbook.fieldTextRadio}>VFR</Text>
                        </View>

                    </View>
                </View> : null}
                {/* IFR/VFR */}

                {p1_us_dayToggle && rosterAId !== 'SIMU' ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}> P1 U/S (Day)</Text>
                        <MaskedTextInput
                            mask='99:99'
                            //value={PerferctP1_us_day}
                            value={isNaN(p1_us_day)?'00:00':p1_us_day}
                            onChangeText={inputText => {SICday_editable(inputText);}}
                            keyboardType="numeric"
                            placeholder="hh:mm"
                            placeholderTextColor='grey'
                            style={{color:dark?'#fff':'#000'}}
                            onFocus = {us_control}
                        />
                    </View>
                </View> : null}

                {p1_us_nightToggle && rosterAId!== 'SIMU' ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}> P1 U/S (Night)</Text>
                        <MaskedTextInput
                            mask='99:99'
                            //value={PerferctP1_us_night}
                            value={p1_us_night}
                            onChangeText={inputText => {SICnight_editable(inputText)}}
                            keyboardType="numeric"
                            placeholder="hh:mm"
                            placeholderTextColor='grey'
                            style={{color:dark?'#fff':'#000'}}
                            onFocus = {us_control}
                        />
                    </View>
                </View> : null}

                {p1_ut_dayToggle && rosterAId!== 'SIMU' ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}> P1 U/T (Day)</Text>
                        <MaskedTextInput
                            mask='99:99'
                            value={p1_ut_day}
                            onChangeText={inputText => setP1_ut_day(inputText)}
                            keyboardType="numeric"
                            placeholder="hh:mm"
                            placeholderTextColor='grey'
                            style={{color:dark?'#fff':'#000'}}
                            onFocus = {ut_control}
                        />
                    </View>
                </View> : null}

                {p1_ut_nightToggle && rosterAId !== 'SIMU' ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}> P1 U/T (Night)</Text>
                        <MaskedTextInput
                            mask='99:99'
                            value={p1_ut_night}
                            onChangeText={p1_ut_night => setP1_ut_night(p1_ut_night)}
                            keyboardType="numeric"
                            placeholder="hh:mm"
                            placeholderTextColor='grey'
                            style={{color:dark?'#fff':'#000'}}
                        />
                    </View>
                </View> : null}

                {Pic_dayToggle && rosterAId!== 'SIMU' ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}> PIC (Day)</Text>
                        <MaskedTextInput
                            mask='99:99'
                            // value={Listparams.itemPicDay?listPicDay:pic_day}
                            value={params.RoasterP1 === 'Self' && dayTime}
                            onChangeText={day_editable}
                            keyboardType="numeric"
                            placeholder="hh:mm"
                            placeholderTextColor='grey'
                            style={{color:dark?'#fff':'#000'}}
                        />
                    </View>
                </View> : null}

                {Pic_nightToggle && rosterAId !== 'SIMU' ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}> PIC (Night)</Text>
                        <MaskedTextInput
                            mask='99:99'
                            //value={Listparams.itemPicNight?listPicNight:pic_night}
                            value={params.RoasterP1 === 'Self' && nightTime}
                            onChangeText={night_editable}
                            keyboardType="numeric"
                            placeholder="hh:mm"
                            placeholderTextColor='grey'
                            style={{color:dark?'#fff':'#000'}}
                        />
                    </View>
                </View> : null}

                {stlToggle && rosterAId !== 'SIMU' ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={Logbook.fieldText}>STL</Text>
                        <CheckBox
                            value={stl}
                            onValueChange={stl => {setStl(stl);STL_CONDITIONS()}}
                            tintColor='#256173'
                            boxType='square'
                            onTintColor='#256173'
                            onCheckColor='#fff'
                            onFillColor='#256173'
                            tintColors={{ true: '#256173', false: '#256173' }}
                            lineWidth={1.5}
                        />
                    </View>
                </View> : null}

                {siToggle && rosterAId!== 'SIMU' ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}>Simulated Instrument</Text>
                        <MaskedTextInput
                            mask='99:99'
                            value={si}
                            onChangeText={inputText => setSi(inputText)}
                            keyboardType="numeric"
                            placeholder="hh:mm"
                            placeholderTextColor='grey'
                            style={{color:dark?'#fff':'#000'}}
                        />
                    </View>
                </View> : null}

                {sic_dayToggle && rosterAId !== 'SIMU' ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}> SIC (Day)</Text>
                        <MaskedTextInput
                            mask='99:99'
                            //value={Listparams.itemSicDay?listSicDay:sic_day}
                            value={params.RoasterP2 === 'Self' && sic_day}
                            onChangeText={inputText => {SICday_editable(inputText)}}
                            keyboardType="numeric"
                            placeholder="hh:mm"
                            placeholderTextColor='grey'
                            style={{color:dark?'#fff':'#000'}}
                        />
                    </View>
                </View> : null}

                {sic_nightToggle && rosterAId!== 'SIMU' ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}> SIC (Night)</Text>
                        <MaskedTextInput
                            mask='99:99'
                            //value={Listparams.itemSicNight?listSicNight:sic_night}
                            value={params.RoasterP2 === 'Self' && sic_night}
                            onChangeText={inputText => {SICnight_editable(inputText)}}
                            keyboardType="numeric"
                            placeholder="hh:mm"
                            placeholderTextColor='grey'
                            style={{color:dark?'#fff':'#000'}}
                        />
                    </View>
                </View> : null}

                {xc_dayToggle && rosterAId!== 'SIMU' ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}>XC (Day)/Legs</Text>
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                            <MaskedTextInput
                                mask='99:99'
                                value={getReduxDisplayData.Xc === true ? dayTime: xc_day}
                                onChangeText={inputText => setDayTime(inputText)}
                                keyboardType="numeric"
                                placeholder="hh:mm"
                                placeholderTextColor='grey'
                                style={{color:dark?'#fff':'#000'}}
                            />
                            <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 45, } }}> /</Text>
                            <TextInput
                                placeholder='Number'
                                placeholderTextColor='grey'
                                value={xc_day_leg}
                                onChangeText={(inputText) => setXc_dayLeg(inputText)}
                                style={dark?{color:'#fff',marginTop: -1}:{ marginTop: -1 }} />
                        </View>
                    </View>
                </View> : null}

                {xc_nightToggle && rosterAId!== 'SIMU' ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}>XC (Night)/Legs</Text>
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                            <MaskedTextInput
                                mask='99:99'
                                value={getReduxDisplayData.Xc === true ? nightTime : xc_night}
                                onChangeText={inputText => setNightTime(inputText)}
                                keyboardType="numeric"
                                placeholder="hh:mm"
                            />
                            <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 45, } }}> /</Text>
                            <TextInput
                                placeholder='Number'
                                placeholderTextColor='grey'
                                value={xc_night_leg}
                                onChangeText={(inputText) => setXc_nightLeg(inputText)}
                                style={dark?{ marginTop: -1, color:'#fff' }:{ marginTop: -1 }} />
                        </View>
                    </View>
                </View> : null}
                
                {timeTextInput.map((Timevalue) => {
                return Timevalue
                })}

                {PurposeData.includes("Cross-country flight (day)")||PurposeData.includes("Cross-country flight (night)") ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}>Distance</Text>
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                            <TextInput
                                placeholder='Number'
                                placeholderTextColor='grey'
                                value={distance.toString()}
                                onChangeText={(distance) => setDistance(distance)}
                                style={dark?{ marginTop: -1, color:'#fff' }:{ marginTop: -1, color:'#000' }} />
                        </View>
                    </View>
                </View>: null}

                {config && rosterAId === 'SIMU' ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, color:dark?'#fff': 'blue' } }}>Select Choices....</Text>
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                            <Text style={{...Logbook.fieldText, ...{lineHeight:35}}}>Select Choices....</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Configuration', { from:'simu' })}>
                                <MaterialCommunityIcons
                                    name="chevron-right" color={'#256173'} size={25} style={{ lineHeight: 35 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View> :
                    <View style={Logbook.fieldWithoutBottom}>
                        {rosterAId=== 'SIMU' && (<View style={Logbook.fields}>
                            <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}>Custom</Text>
                            <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => setFlightModalVisible(true)}>
                                    <MaterialCommunityIcons
                                        name="plus-circle" color={'#256173'} size={25} style={{ lineHeight: 35 }} />
                                </TouchableOpacity>
                            </View>
                        </View>)}
                    </View>}

                {/* Modal for Time */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={TimemodalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setTimeModalVisible(!TimemodalVisible);
                    }}
                >
                    <View style={ModalView.FlightcenteredView}>
                        <View style={ModalView.flightModalView}>
                            
                            <View style={{paddingVertical:10, alignItems: 'center'}}>
                            <MaterialCommunityIcons name="check-circle-outline" color={'#000'} size={50} style={{}}/>
                            <Text style={styles.modalText}>Set Title</Text>
                            </View>

                            <View style={{backgroundColor: '#EFEFEF', width:'100%', alignItems:'center', padding:10}}>
                            <Text style={ModalView.modalText}>Set Name for custom field</Text>
                            <TextInput
                                placeholder='Name'
                                placeholderTextColor='#D0D0D0'
                                value={TimeFilterCustom}
                                onChangeText={(text)=>setTimeFilterCustom(text)}
                                style={ModalView.modalViewTextInput} />
                            </View>
                            

                            <View style={{backgroundColor: '#EFEFEF',borderRadius: 10}}>
                            <View style={{ flexDirection:'row', justifyContent:'space-between', padding:10 }}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => {TimeInputText(timeTextInput.length) }}>
                                    <Text style={styles.textStyle}>OK</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setTimeModalVisible(!TimemodalVisible)}>
                                    <Text style={styles.textStyle}>CANCEL</Text>
                                </Pressable>
                            </View>
                            </View>
                            

                    </View>
                    </View>
                </Modal>

                {config ?
                    <View style={Logbook.fieldWithoutBottom}>
                        {rosterAId!== 'SIMU' && (<View style={Logbook.fields}>
                            <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, color: dark?'#fff':'blue' } }}>Select Choices....</Text>
                            <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                                {/* <Text style={{...Logbook.fieldText, ...{lineHeight:35}}}>Select Choices....</Text> */}
                                <TouchableOpacity onPress={() => navigation.navigate('Configuration', { from: 'Time' })}>
                                    <MaterialCommunityIcons
                                        name="chevron-right" color={'#256173'} size={25} style={{ lineHeight: 35 }} />
                                </TouchableOpacity>
                            </View>
                        </View>)}
                    </View> :
                    <View style={Logbook.fieldWithoutBottom}>
                        {rosterAId!== 'SIMU' && (<View style={Logbook.fields}>
                            <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}>Custom</Text>
                            <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => setTimeModalVisible(true)}>
                                    <MaterialCommunityIcons
                                        name="plus-circle" color={'#256173'} size={25} style={{ lineHeight: 35 }} />
                                </TouchableOpacity>
                            </View>
                        </View>)}
                    </View>}

                {/* landing */}
                {rosterAId!== 'SIMU' && (<View style= {modalVisible || FlightmodalVisible || TimemodalVisible || LandingmodalVisible || ApproachmodalVisible || FlightAlertmodalVisible || TimeAlertmodalVisible || AppAlertmodalVisible || lndgAlertmodalVisible || importModal || RostermodalVisible ? {...Logbook.headline, ...{backgroundColor: 'rgba(0, 0, 0, 0)'}} : dark ? Logbook.Darkheadline:Logbook.headline}>
                    <Text style={dark?Logbook.DarkHeadlineText:Logbook.HeadlineText}>Landing</Text>
                    <MaterialCommunityIcons  
                name="help-circle-outline" color='#256173' size={25} onPress={() => setlndgAlertModalVisible(true)} style={{lineHeight:45, position:'absolute', left: 350 }} />
                
                </View>)}

                {autoLandingToggle ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}> Auto Landing</Text>
                        <TextInput
                            placeholder='Please Enter Number'
                            placeholderTextColor='grey'
                            value={autoLanding}
                            onChangeText={(inputText) => setAutoLanding(inputText)}
                            style={{marginTop: -5, color:dark?'#fff':'#000'}} />
                    </View>
                </View> : null}

                {dayLandingToggle && rosterAId!== 'SIMU' ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}> Day Landing</Text>
                        <TextInput
                            placeholder='Please Enter Number'
                            placeholderTextColor='grey'
                            value={dayLanding.toString()}
                            onChangeText={(inputText) => setDayLanding(inputText)}
                            style={{ marginTop: -5, color:dark?'#fff':'#000' }} />
                    </View>
                </View> : null}

                {day_toToggle && rosterAId!== 'SIMU' ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}> Day T/O</Text>
                        <TextInput
                            placeholder='Please Enter Number'
                            placeholderTextColor='grey'
                            value={day_to.toString()}
                            onChangeText={(inputText) => setDay_to(inputText)}
                            style={{ marginTop: -5, color:dark?'#fff':'#000'}} 
                            />
                    </View>
                </View> : null}


                {fullStopToggle ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}> Full Stop</Text>
                        <TextInput
                            placeholder='Please Enter Number'
                            placeholderTextColor='grey'
                            value={fullStop}
                            onChangeText={(inputText) => setFullStop(inputText)}
                            style={{ marginTop: -5, color:dark?'#fff':'#000'}} />
                    </View>
                </View> : null}

                {nightLandingToggle && rosterAId !== 'SIMU' ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}> Night Landing</Text>
                        <TextInput
                            placeholder='Please Enter Number'
                            placeholderTextColor='grey'
                            value={nightLanding.toString()}
                            onChangeText={(inputText) => setNightLanding(inputText)}
                            style={{ marginTop: -5, color:dark?'#fff':'#000' }} />
                    </View>
                </View> : null}

                {night_toToggle && rosterAId!== 'SIMU' ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}> Night T/O</Text>
                        <TextInput
                            placeholder='Please Enter Number'
                            placeholderTextColor='grey'
                            value={night_to.toString()}
                            onChangeText={(inputText) => setNight_to(inputText)}
                            style={{ marginTop: -5, color:dark?'#fff':'#000' }} />
                    </View>
                </View> : null}

                {touchGoToggle ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}> Touch & Go's</Text>
                        <TextInput
                            placeholder='Please Enter Number'
                            placeholderTextColor='grey'
                            value={touchGo}
                            onChangeText={(inputText) => setTouchGo(inputText)}
                            style={{ marginTop: -5, color:dark?'#fff':'#000' }} />
                    </View>
                </View> : null}

                {waterLandingToggle ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}> Water Landing</Text>
                        <TextInput
                            placeholder='Please Enter Number'
                            placeholderTextColor='grey'
                            value={waterLanding}
                            onChangeText={(inputText) => setWaterLanding(inputText)}
                            style={{ marginTop: -5, color:dark?'#fff':'#000' }} />
                    </View>
                </View> : null}

                {water_toToggle ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}> Water T/O</Text>
                        <TextInput
                            placeholder='Please Enter Number'
                            placeholderTextColor='grey'
                            value={water_to}
                            onChangeText={(inputText) => setWater_to(inputText)}
                            style={{ marginTop: -5, color:dark?'#fff':'#000' }} />
                    </View>
                </View> : null}

                {LandingTextInput.map((Landingvalue) => {
                return Landingvalue
                })}

                {/* Modal for landing */}
                <Modal
                    animationType="fade"
                    transparent={true}
                    visible={LandingmodalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setLandingModalVisible(!LandingmodalVisible);
                    }}
                >
                   <View style={ModalView.FlightcenteredView}>
                        <View style={ModalView.flightModalView}>
                            
                            <View style={{paddingVertical:10, alignItems: 'center'}}>
                            <MaterialCommunityIcons name="check-circle-outline" color={'#000'} size={50} style={{}}/>
                            <Text style={styles.modalText}>Set Title</Text>
                            </View>

                            <View style={{backgroundColor: '#EFEFEF', width:'100%', alignItems:'center', padding:10}}>
                            <Text style={ModalView.modalText}>Set Name for custom field</Text>
                            <TextInput
                                placeholder='Name'
                                placeholderTextColor='#D0D0D0'
                                value={LandingFilterCustom}
                                onChangeText={(text)=>setLandingFilterCustom(text)}
                                style={ModalView.modalViewTextInput} />
                            
                            <View style={{ flexDirection:'row', justifyContent:'space-between', padding:10}}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => {LandingInputText(LandingTextInput.length) }}>
                                    <Text style={styles.textStyle}>OK</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setLandingModalVisible(!LandingmodalVisible)}>
                                    <Text style={styles.textStyle}>CANCEL</Text>
                                </Pressable>
                            </View>
                            </View>
                         
                         </View>
                    </View>
                </Modal>

                {config ? <View style={Logbook.fieldWithoutBottom}>
                    {rosterAId !== 'SIMU' && (<View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, color:dark?'#fff': 'blue' } }}>Select Choices....</Text>
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                            {/* <Text style={{...Logbook.fieldText, ...{lineHeight:35}}}>Select Choices....</Text> */}
                            <TouchableOpacity onPress={() => navigation.navigate('Configuration', { from: 'landing' })}>
                                <MaterialCommunityIcons
                                    name="chevron-right" color={'#256173'} size={25} style={{ lineHeight: 35 }} />
                            </TouchableOpacity>
                        </View>
                    </View>)}
                </View> :
                    <View style={Logbook.fieldWithoutBottom}>
                        {rosterAId!== 'SIMU' && (<View style={Logbook.fields}>
                            <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}>Custom</Text>
                            <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                                <TouchableOpacity onPress={() => setLandingModalVisible(true)}>
                                    <MaterialCommunityIcons
                                        name="plus-circle" color={'#256173'} size={25} style={{ lineHeight: 35 }} />
                                </TouchableOpacity>
                            </View>
                        </View>)}
                    </View>}

                {/* Approaches */}
                {rosterAId!== 'SIMU' && (<View style= {modalVisible || FlightmodalVisible || TimemodalVisible || LandingmodalVisible || ApproachmodalVisible || FlightAlertmodalVisible || TimeAlertmodalVisible || AppAlertmodalVisible || lndgAlertmodalVisible || importModal || RostermodalVisible ? {...Logbook.headline, ...{backgroundColor: 'rgba(0, 0, 0, 0)'}} : dark ? Logbook.Darkheadline:Logbook.headline}>
                    <Text style={dark?Logbook.DarkHeadlineText:Logbook.HeadlineText}>Approaches</Text>
                    <MaterialCommunityIcons  
                name="help-circle-outline" color='#256173' size={25} onPress={() => setAppAlertModalVisible(true)} style={{lineHeight:45, position:'absolute', left: 350 }} />
                </View>)}

                {rosterAId !== 'SIMU' && (<View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}>Approach 1</Text>
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                            {/* <Text style={{ paddingTop: 10 }}>{approach1}</Text> */}
                            <Text style={{ paddingTop: 10 }}>{Approach1}</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Approach')}>
                                <MaterialCommunityIcons
                                    name="chevron-right" color={'#256173'} size={25} style={{ lineHeight: 35 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>)}

                {Approach2Toggle && rosterAId!== 'SIMU' ? <View style={Logbook.fieldWithoutBottom}>
                    <View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}>Approach 2</Text>
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                            <Text style={{ paddingTop: 10 }}>{approach2}</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Approach')}>
                                <MaterialCommunityIcons
                                    name="chevron-right" color={'#256173'} size={25} style={{ lineHeight: 35 }} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View> : null}

                {ApproachTextInput.map((Approachvalue) => {
                return Approachvalue
                })}

                 {/* Modal for Approaches */}
                 <Modal
                    animationType="fade"
                    transparent={true}
                    visible={ApproachmodalVisible}
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setApproachModalVisible(!ApproachmodalVisible);
                    }}
                >
                   <View style={ModalView.FlightcenteredView}>
                        <View style={ModalView.flightModalView}>
                            
                            <View style={{paddingVertical:10, alignItems: 'center'}}>
                            <MaterialCommunityIcons name="check-circle-outline" color={'#000'} size={50} style={{}}/>
                            <Text style={styles.modalText}>Set Title</Text>
                            </View>

                            <View style={{backgroundColor: '#EFEFEF', width:'100%', alignItems:'center',padding:10}}>
                            <Text style={ModalView.modalText}>Set Name for custom field</Text>
                            <TextInput
                                placeholder='Name'
                                placeholderTextColor='#D0D0D0'
                                value={ApproachFilterCustom}
                                onChangeText={(text)=>setApproachFilterCustom(text)}
                                style={ModalView.modalViewTextInput} />
                         
                            <View style={{ flexDirection:'row', justifyContent:'space-evenly', padding:10}}>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => {ApproachInputText(ApproachTextInput.length)}}>
                                    <Text style={styles.textStyle}>OK</Text>
                                </Pressable>
                                <Pressable
                                    style={[styles.button, styles.buttonClose]}
                                    onPress={() => setApproachModalVisible(!ApproachmodalVisible)}>
                                    <Text style={styles.textStyle}>CANCEL</Text>
                                </Pressable>
                            </View>
                            </View>
                         
                         </View>
                    </View>
                </Modal>

                {config ? <View style={Logbook.fieldWithoutBottom}>
                    {rosterAId!== 'SIMU' && (<View style={Logbook.fields}>
                        <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, color:dark?'#fff': 'blue' } }}>Select Choices....</Text>
                        <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                            {/* <Text style={{...Logbook.fieldText, ...{lineHeight:35}}}>Select Choices....</Text> */}
                            <TouchableOpacity onPress={() => navigation.navigate('Configuration', { from: 'Approach' })}>
                                <MaterialCommunityIcons
                                    name="chevron-right" color={'#256173'} size={25} style={{ lineHeight: 35 }} />
                            </TouchableOpacity>
                        </View>
                    </View>)}
                </View> :
                    <View style={Logbook.fieldWithoutBottom}>
                        {rosterAId!== 'SIMU' && (<View style={Logbook.fields}>
                            <Text style={{ ...Logbook.fieldText, ...{ lineHeight: 35, } }}>Custom</Text>
                            <View style={{ justifyContent: 'flex-end', flexDirection: 'row' }}>
                                <TouchableOpacity onPress={()=>setApproachModalVisible(!ApproachmodalVisible)}>
                                    <MaterialCommunityIcons
                                        name="plus-circle" color={'#256173'} size={25} style={{ lineHeight: 35 }} />
                                </TouchableOpacity>
                            </View>
                        </View>)}
                    </View>}

                {/*Remark*/}
                <View style= {modalVisible || FlightmodalVisible || TimemodalVisible || LandingmodalVisible || ApproachmodalVisible || FlightAlertmodalVisible || TimeAlertmodalVisible || AppAlertmodalVisible || lndgAlertmodalVisible || importModal || RostermodalVisible  ? {...Logbook.headline, ...{backgroundColor: 'rgba(0, 0, 0, 0)'}} : dark ? Logbook.Darkheadline:Logbook.headline}>
                    <Text style={dark?Logbook.DarkHeadlineText:Logbook.HeadlineText}>Remark</Text>
                </View>

                <View style={{padding:10}}>
                    <View style={Logbook.remarksBox}>
                        <TextInput
                            placeholder=' Your Remarks'
                            placeholderTextColor='#393F45'
                            value={remark}
                            onChangeText={(inputText) => setRemark(inputText)}
                            style={Platform.OS === 'android' ? { marginTop: -20, color:dark?'#fff':'#000' } : { marginTop: -10, color:dark?'#fff':'#000' }} 
                            />
                    </View>
                </View>

            </ScrollView>


            
            
            <Modal
            animationType="fade"
            transparent={true}
            visible={RostermodalVisible}
            onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setRosterModalVisible(!RostermodalVisible);
            }}
            >
            <View style={styles.RostercenteredView}>
            <View style={styles.modalView}>
              <View style={{backgroundColor:'#fff',width:'100%',borderRadius: 10}}>
                <View style={{paddingVertical:10, alignItems: 'center'}}>
                    <MaterialCommunityIcons name="close-circle" color={'#000'} size={20} style={{paddingLeft:300}} onPress={()=>setRosterModalVisible(false)}/>
                    <MaterialCommunityIcons name="check-circle-outline" color={'#000'} size={50} style={{}}/>
                    <Text style={styles.modalText} onPress={removeTextInput}>Set Title</Text>
                </View>
            </View>
            <View style={{flexDirection:'row', paddingTop:10}}>
            <Text style={{paddingRight:120}}>From</Text>
            <Text>To</Text>
            </View>
              <View style={{flexDirection:'row',padding:10}}>
              <DatePicker
                    //style={styles.datePickerStyle}
                    date={fromDate} // Initial date from state
                    mode="date" // The enum of date, datetime and time
                    placeholder="From"
                    placeholderTextColor = "#266173"
                    format= "DD-MM-YYYY"
                    //minDate="01-01-2016"
                    //maxDate="01-01-2019"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    suffixIcon={null}
                    customStyles={{
                        dateInput: {
                        borderWidth:0.2,
                        borderRadius: 15,
                        borderColor: '#EFEFEF',
                        width: '100%',
                        backgroundColor: '#fff',
                        },
                        dateIcon: {
                        width:0,
                        height:0,
                        },
                    }}
                    onDateChange={(fromDate) => {
                        setFromDate(fromDate);
                    }}
                    />
                    <DatePicker
                    //style={styles.datePickerStyle}
                    date={toDate} // Initial date from state
                    mode="date" // The enum of date, datetime and time
                    placeholder="To"
                    placeholderTextColor = "#266173"
                    format = "DD-MM-YYYY" 
                    //minDate="01-01-2016"
                    //maxDate="01-01-2019"
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    suffixIcon={null}
                    customStyles={{
                        dateInput: {
                        borderWidth:0.2,
                        borderRadius: 15,
                        borderColor: '#EFEFEF',
                        width: '100%',
                        backgroundColor: '#fff'
                        },
                        dateIcon: {
                        width:0,
                        height:0,
                        },
                    }}
                    onDateChange={(toDate) => {
                        setToDate(toDate);
                    }}
                    />
                    </View>
                {dataFetched === true ?
                <View>
                    <ProgressBar progress={progressValue} color={'#256173'} style={{width:200, marginTop:15}}/>
                </View>: 
                    null}
              
              <View style={{flexDirection:'row', padding:10}}>
              <TouchableOpacity
              style={[styles.Modalbutton, styles.buttonClose]}
              onPress={Roaster}
              >
              <Text style={{color: '#fff'}}>Import Log Data</Text>
              </TouchableOpacity>
              </View>

              </View>
              </View>
          </Modal>

          {pilotsFetched===true ?
                      <View style={BackupStyle.centeredView}>
                      <Modal
                        animationType="slide"
                        transparent={true}
                        visible={importModal}
                      >
                        <View style={BackupStyle.centeredView}>
                          <View style={BackupStyle.modalView}>
                            {/* <Text style={styles.modalText}>Logs are Downloading!!</Text> */}
                            <ActivityIndicator color={'#fff'} />
                            <Text style={{ color: '#fff' }}>Importing Pilot List ....</Text>
                          </View>
                        </View>
                      </Modal>
                    </View>
                    :  null
                    }

            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    presentationStyle='overFullScreen'
                    onRequestClose={() => {
                        Alert.alert("Modal has been closed.");
                        setModalVisible(!modalVisible);
                    }}
                    >
                    <View style={styles.centeredView}>
                        <View style={dark?styles.DarkmodalView:styles.modalView}>
                            <View style={ModalView.Modal}>
                                <Text style={ModalView.ModalHeading}>Select Option</Text>
                            </View>
                            <TouchableOpacity style={ModalView.Modal} onPress={Configuration}>
                            <MaterialCommunityIcons name="pin" color={dark?'#fff':'#000'} size={20}/>
                                <View>
                                    {config ? <Text style={dark?ModalView.DarkModalListingText:ModalView.ModalListingText}> Done Config</Text> : <Text style={dark?ModalView.DarkModalListingText:ModalView.ModalListingText}>Config</Text>}
                                </View>
                            </TouchableOpacity>
                            {rosterId ?
                                <TouchableOpacity style={ModalView.Modal} onPress={()=>{DeleteLogs()}}>
                                    <MaterialCommunityIcons name="account-plus" color={dark?'#fff':'#000'} size={20}/>
                                    <View>
                                        <Text style={dark?ModalView.DarkModalListingText:ModalView.ModalListingText}>Delete</Text>
                                    </View>
                                </TouchableOpacity> :
                                <TouchableOpacity style={ModalView.Modal} onPress={resetHandler}>
                                    <MaterialCommunityIcons name="account-plus" color={dark?'#fff':'#000'} size={20}/>
                                    <View>
                                        <Text style={dark?ModalView.DarkModalListingText:ModalView.ModalListingText}>Add</Text>
                                    </View>
                                </TouchableOpacity>}
                            <TouchableOpacity style={ModalView.Modal} onPress={resetHandler}>
                                <MaterialCommunityIcons name="airplane" color={dark?'#fff':'#000'} size={20}/>
                                <View>
                                    <Text style={dark?ModalView.DarkModalListingText:ModalView.ModalListingText}>New Flight</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={ModalView.Modal}>
                            <MaterialCommunityIcons name="content-copy" color={dark?'#fff':'#000'} size={20}/>
                            <View>
                                <Text style={dark?ModalView.DarkModalListingText:ModalView.ModalListingText}>Copy Trip</Text>
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={ModalView.Modal} onPress={returnTrip}>
                            <MaterialCommunityIcons name="keyboard-return" color={dark?'#fff':'#000'} size={20}/>
                            <View>
                                <Text style={dark?ModalView.DarkModalListingText:ModalView.ModalListingText}>Return Trip</Text>
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={ModalView.Modal} onPress={nextLeg}>
                            <MaterialCommunityIcons name="skip-forward" color={dark?'#fff':'#000'} size={20}/>
                            <View>
                                <Text style={dark?ModalView.DarkModalListingText:ModalView.ModalListingText}>Next Leg</Text>
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={ModalView.Modal} onPress={OpenRosterDateModal}>
                            <MaterialCommunityIcons name="application-import" color={dark?'#fff':'#000'} size={20}/>
                            <View>
                                <Text style={dark?ModalView.DarkModalListingText:ModalView.ModalListingText}>Roster Import</Text>
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={ModalView.Modal} onPress={importPilotList}>
                            <MaterialCommunityIcons name="database-import" color={dark?'#fff':'#000'} size={20}/>
                            <View>
                                <Text style={dark?ModalView.DarkModalListingText:ModalView.ModalListingText}>Import Pilot List</Text>
                            </View>
                            </TouchableOpacity>
                            <TouchableOpacity style={ModalView.Modal} onPress={()=>{navigation.navigate('EGCAUpload'); setModalVisible(false)}}>
                            <MaterialCommunityIcons name="application-import" color={dark?'#fff':'#000'} size={20}/>
                            <View>
                                <Text style={dark?ModalView.DarkModalListingText:ModalView.ModalListingText}>EGCA UPLOAD</Text>
                            </View>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.centeredViewCancel}>
                        <TouchableOpacity style={dark?styles.DarkmodalViewCancel:styles.modalViewCancel} onPress={() => setModalVisible(!modalVisible)}>
                            <View style={{alignItems: 'center'}}>
                                <View style={{padding:15}}><Text style={dark?styles.DarkcancelText:styles.cancelText}>CANCEL</Text></View>
                            </View>
                        </TouchableOpacity>
                    </View>

                </Modal>
            </View>
        
        </SafeAreaView>
        </ScrollView>
        <View style={dark?Logbook.DarkbuttonView:Logbook.buttonView}>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity onPress={()=>{insertQuery();constUpdateP2();Add_Logbook();}}> 
                        <View style={Logbook.button}>
                            <Text style={Logbook.buttonText}>Save</Text>
                        </View>
                    </TouchableOpacity>
                    {/* } */}
                    <TouchableOpacity onPress={() => setModalVisible(true)}>
                        <MaterialCommunityIcons
                            name="menu" color={dark?'#fff':'#000'} size={30} style={{ marginLeft: 10 }} />
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
       
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        //justifyContent: "center",
        //alignItems: "flex-start",
        // marginTop: '5%',

    },
    centeredViewCancel: {
        //flex: 1,
        justifyContent: "center",
        alignItems: "center",
        paddingBottom: '50%',
        //marginBottom: 10,
        //padding:10,
    },
    modalView: {
        marginLeft: '5%',
        backgroundColor: "#EFEFEF",
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
        position: 'absolute',
        bottom: '1%',
        //flexDirection: 'row'
    },
    DarkmodalView: {
        marginLeft: '5%',
        backgroundColor: "#000",
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
        position: 'absolute',
        bottom: '1%',
        //flexDirection: 'row'
    },
    modalViewCancel: {
        marginLeft: '5%',
        backgroundColor: "#EFEFEF",
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
        position: 'absolute',
        top: '10%'
    },
    DarkmodalViewCancel: {
        marginLeft: '5%',
        backgroundColor: "#000",
        borderRadius: 10,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '90%',
        position: 'absolute',
        top: '10%'
    },
    button: {
        borderRadius: 20,
        padding: 5,
        //elevation: 2,
        width: '45%',
        //justifyContent : 'space-evenly'
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#256173",
    },
    textStyle: {
        color: "white",
        fontFamily: "WorkSans-Regular",
        textAlign: "center",
        fontSize : 10,
    },
    modalText: {
        //marginBottom: 15,
        textAlign: "center", 
        fontFamily: 'WorkSans-Bold',
        fontSize: 20,
    },
    header:{
        padding: 5,
        flexDirection: 'row',
        backgroundColor: '#256173'
      },
      aircrafts: {
        fontSize: 15,
        color: '#fff',
        fontWeight: '700',
        fontFamily:'WorkSans-Regular',
        paddingTop: 5
      },
      textInput: {
          borderBottomColor: '#000',
          borderBottomWidth: 1
      },
      RostercenteredView:{
        //flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 400,
        //padding:100
      },
      Modalbutton:{
        backgroundColor: '#256173',
          padding: 5,
          marginTop: 20,
          width: Dimensions.get('window').width*0.3,
          borderRadius:10,
          alignItems:'center',
          
      },
      cancelText:{
          fontFamily:'WorkSans-Bold',
          fontSize: 18,
      },
      DarkcancelText:{
        fontFamily:'WorkSans-Bold',
        fontSize: 18,
        color:'#fff'
    },
    InnnerHeadings:{
        paddingHorizontal: 20,
        fontWeight: '600',
        fontFamily: 'WorkSans-Regular',
      },
      DarkInnnerHeadings:{
        paddingHorizontal: 20,
        fontWeight: '600',
        fontFamily: 'WorkSans-Regular',
        color:'#fff'
      }
});

//make this component available to the app
export default CreateLogbook;
