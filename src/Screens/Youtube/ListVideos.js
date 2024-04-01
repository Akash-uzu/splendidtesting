import React from 'react';
import { View, Text, FlatList, Image } from 'react-native';

const ListVideos = ({ videos }) => {
  return (
    <View>
      <FlatList
        data={videos}
        keyExtractor={(item) => item.id.videoId}
        renderItem={({ item }) => (
          <View>
            <Image
              source={{ uri: item.snippet.thumbnails.default.url }}
              style={{ width: 100, height: 100 }} // Adjust dimensions as needed
            />
            <Text>{item.snippet.title}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default ListVideos;
