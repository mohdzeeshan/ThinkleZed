import { Image, ImageSourcePropType, ImageStyle, StyleSheet, TouchableOpacity, View } from "react-native"
import {HomeIcon,FavoriteIcon , CloseIcon, SearchIcon} from "../assets"


const renderIcon = (imageSource:ImageSourcePropType ): JSX.Element => {
    return (
      <TouchableOpacity>
        <Image
          source={imageSource}
          style={{width: 24, height: 24, resizeMode: 'contain', marginRight:10} as ImageStyle}
        />
      </TouchableOpacity>
    );
  };

const HeaderRow = (): JSX.Element => {
    return (
        <View style={styles.headerRow}>
          {renderIcon(SearchIcon)}
          <View style={styles.row}>
          {renderIcon(FavoriteIcon)}
          {renderIcon(CloseIcon)}
          </View>
        </View>
    )
}
export default HeaderRow
const styles = StyleSheet.create({

    row:{flexDirection:'row'},
      headerRow:{
        flexDirection:'row',
        padding:12,
        justifyContent:'space-between',
        alignItems:'center'
  
      },

  });