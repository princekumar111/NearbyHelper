
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useEffect, useRef, useState, useContext } from "react";
import API from "../../api/api";
import { AuthContext } from "../../context/AuthContext";

const { width } = Dimensions.get("window");

/* 🔁 Carousel Images (local / url dono chalenge) */
const carouselData = [
  {
    id: "1",
    image:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952",
   
  },
  {
    id: "2",
    image:
      "https://images.unsplash.com/photo-1562259949-e8e7689d7828",
  
  },
  {
    id: "3",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
   
  },
];

export default function HomeScreen({ navigation }) {
  const [categories, setCategories] = useState([]);
  const { user } = useContext(AuthContext);

  const carouselRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  /* 🔄 Auto Slide */
  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex =
        activeIndex === carouselData.length - 1
          ? 0
          : activeIndex + 1;

      carouselRef.current?.scrollToIndex({
        index: nextIndex,
        animated: true,
      });

      setActiveIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeIndex]);

  useEffect(() => {
    API.get("/categories").then((res) => setCategories(res.data));
  }, []);

  const renderCategory = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("Providers", { category: item.name })
      }
    >
      <Text style={styles.icon}>{item.icon || "🔧"}</Text>
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );

  const renderCarouselItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={{ uri: item.image }} style={styles.carouselImage} />
      <View style={styles.carouselOverlay}>
        <Text style={styles.carouselText}>{item.text}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.container}>
        <Text style={styles.welcome}>Welcome, {user?.name}</Text>

        {/* 🔁 IMAGE CAROUSEL */}
        <FlatList
          ref={carouselRef}
          data={carouselData}
          renderItem={renderCarouselItem}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={{ marginBottom: 20 }}
        />

       

        <Text style={styles.section}>Available Services</Text>

        <FlatList
          data={categories}
          keyExtractor={(i) => i._id}
          renderItem={renderCategory}
          numColumns={2}
          columnWrapperStyle={{ justifyContent: "space-between" }}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: "#e9f9f3ff" },
  container: { flex: 1, padding: 14 },

  welcome: {
    fontSize: 22,
    fontWeight: "800",
    marginBottom: 14,
  },

  /* 🔁 Carousel */
  carouselItem: {
    width: width - 28,
    height: 170,
    borderRadius: 18,
    overflow: "hidden",
    marginRight: 10,
  },

  carouselImage: {
    width: "100%",
    height: "100%",
  },

  carouselOverlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    padding: 12,
  },

  carouselText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  myBooking: {
    backgroundColor: "#4F46E5",
    padding: 16,
    borderRadius: 14,
    marginBottom: 20,
  },

  myBookingText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },

  section: {
    fontSize: 18,
    fontWeight: "800",
    marginBottom: 12,
  },

  card: {
    width: "48%",
    backgroundColor: "#fff",
    paddingVertical: 26,
    borderRadius: 18,
    alignItems: "center",
    marginBottom: 14,
    elevation: 4,
  },

  icon: { fontSize: 30, marginBottom: 6 },

  name: { fontSize: 15, fontWeight: "700" },
});
