import { Picker } from "@react-native-picker/picker";
import { View } from "react-native";

const PickFilter = ({ selectedFilter, setSelectedFilter }) => {
  return (
    <View style={{ padding: 10 }}>
      <Picker
        selectedValue={selectedFilter}
        onValueChange={(itemValue) => itemValue && setSelectedFilter(itemValue)}
        style={{ backgroundColor: "#fff" }}
      >
        <Picker.Item color="grey" label="Select filter" value={null} />
        <Picker.Item
          label="Latest repositories"
          value={{ orderBy: "CREATED_AT", orderDirection: "ASC" }}
        />
        <Picker.Item
          label="Highest rated repositories"
          value={{ orderBy: "RATING_AVERAGE", orderDirection: "DESC" }}
        />
        <Picker.Item
          label="Lowest rated repositories"
          value={{ orderBy: "RATING_AVERAGE", orderDirection: "ASC" }}
        />
      </Picker>
    </View>
  );
};
export default PickFilter;
