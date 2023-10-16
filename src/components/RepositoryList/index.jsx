import { FlatList, View, StyleSheet } from "react-native";
import RepositoryItem from "../RepositoryItem";
import useRepositories from "../../hooks/useRepositories";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router";
import React, { useEffect, useState } from "react";
import PickFilter from "./PickFilter";
import SearchFilter from "./SearchFilter";
import { useDebounce } from "use-debounce";
import { ME } from "../../graphql/queries";

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export class RepositoryListContainer extends React.Component {
  renderHeader = () => {
    const props = this.props;
    // this.props contains the component's props
    return (
      <>
        <SearchFilter
          searchQuery={props.searchQuery}
          setSearchQuery={props.setSearchQuery}
        />
        <PickFilter
          selectedFilter={props.selectedFilter}
          setSelectedFilter={props.setSelectedFilter}
        />
      </>
    );
  };

  render() {
    const props = this.props;
    const repositoryNodes = props.repositories
      ? props.repositories.edges.map((edge) => edge.node)
      : [];

    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <RepositoryItem item={item} />}
        ListHeaderComponent={this.renderHeader}
        onEndReached={props.onEndReach}
        onEndReachedThreshold={0.1}
      />
    );
  }
}

const RepositoryList = () => {
  const [selectedFilter, setSelectedFilter] = useState({
    orderBy: "CREATED_AT",
    orderDirection: "ASC",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const auth = useQuery(ME);
  const navigate = useNavigate();
  const [debouncedText] = useDebounce(searchQuery, 500);

  const { data, loading, fetchMore } = useRepositories({
    searchKeyword: debouncedText,
    first: 3,
    orderBy: selectedFilter.orderBy,
    orderDirection: selectedFilter.orderDirection,
  });

  const dataRepositories = data && !loading ? data : null;

  const dataMe = auth.data && !auth.loading ? auth.data.me : null;

  const onEndReach = () => {
    fetchMore();
  };

  useEffect(() => {
    if (!dataMe) navigate("/signin");
  }, [dataMe]);

  if (loading && auth.loading) {
    return null;
  }

  return (
    <RepositoryListContainer
      repositories={dataRepositories}
      selectedFilter={selectedFilter}
      setSelectedFilter={setSelectedFilter}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      onEndReach={onEndReach}
    />
  );
};

export default RepositoryList;
