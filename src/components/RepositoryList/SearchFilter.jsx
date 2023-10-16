import { View } from "react-native";
import { Searchbar } from "react-native-paper";

const SearchFilter = ({ searchQuery, setSearchQuery }) => {
  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <View style={{ marginTop: 10, paddingHorizontal: 10 }}>
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
      />
    </View>
  );
};
export default SearchFilter;
