import { StyleSheet } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";


const styles = StyleSheet.create({
    bubbleWrapper:{
        flexDirection:'column'
    },
    bubbleWrapperSent:{
        alignSelf:'flex-end',
        marginLeft:40
    },
    bubbleWrapperReceived:{
        alignSelf:'flex-start',
        marginRight:40
    },
    balloon:{
        paddingHorizontal:8,
        paddingVertical:8,
        borderRadius:16
    },
    balloonSent:{
        backgroundColor:Colors.primary
    },
    balloonReceived:{
        backgroundColor:Colors.gray
    },
    balloonText:{
        fontSize:18
    },
    balloonTextSent:{
        color:Colors.white
    },
    balloonTextReceived:{
        color:Colors.black
    }
});

export default styles;