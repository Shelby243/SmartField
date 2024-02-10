import { StyleSheet, Text, View, Dimensions } from "react-native";
import { BarChart } from "react-native-chart-kit";
import Screen from "./Screen";
import apiClient from "../api/client";
import { useEffect, useState } from "react";

const HumChart = () => {
  const [values, setValues] = useState([]);
  const getData = async () => {
    try {
      const response = await apiClient.get(
        "https://0z39qetxsl.execute-api.us-east-1.amazonaws.com/prod/all-data"
      );
      setValues(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const data = {
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  };
  //sort data
  const sortedData = values
    .slice()
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  //setting labels
  const labels = sortedData?.map((item) => {
    const timeString = item.timestamp;
    const formattedData = new Date(timeString).toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });

    return formattedData.substring(10);
  });
  data.labels = labels;

  //setting data
  const datasets = values?.map((item) => {
    const hum = item.predict_hum.toFixed(2);
    return hum;
  });

  data.datasets[0].data = datasets;
  return (
    <Screen style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Humidity Chart</Text>
      </View>
      <BarChart
        data={data}
        width={Dimensions.get("window").width}
        height={350}
        yAxisInterval={1}
        chartConfig={{
          backgroundColor: "#000",
          backgroundGradientFrom: "#2AAA8A",
          backgroundGradientFromOpacity: 9,
          backgroundGradientTo: "#478778",
          backgroundGradientToOpacity: 80,
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,

          style: {
            borderRadius: 16,
          },
          propsForLabels: {
            fontWeight: "bold",
            fontSize: "12px",
          },
        }}
      />
    </Screen>
  );
};
export default HumChart;
const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
    flexDirection: "column",
  },
  header: {
    marginBottom: 10, // Adjust as needed
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
