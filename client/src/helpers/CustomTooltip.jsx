const CustomTooltip = ({ active, payload }) => {
    // console.log("inside CustomTooltip")

    if (active && payload && payload.length) {
      const { name, value, payload: data } = payload[0];
    //   console.log("name: ",name, "value: ",value, "payload :",payload)

      return (
        <div className="bg-white p-2 rounded shadow text-sm flex items-center gap-2">
          <span
            className="inline-block w-3 h-3 rounded-full"
            style={{ backgroundColor: data.color }}
          ></span>
          <div>
            <p className="text-[#242424] font-semibold">{name}</p>
            <p className="text-gray-600">₹ {value}</p>
          </div>
        </div>
      );
    }
    return null;
};

export default CustomTooltip