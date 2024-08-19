const updateProduct = async product => {
  try {
    const response = await fetch(
      "https://storekeeper-server-76iw.onrender.com/products/update",
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(product),
      }
    );

    if (!response.ok) {
      return `Error: ${response.statusText}`;
    }
    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error("Error making PATCH request:", error);
    return error;
  }
};

module.exports = { updateProduct };
