const groupByType = (array) => {
    const grouped = array.reduce((acc, curr) =>{
        const {type, amount} = curr
    
        if(!acc[type]){
            acc[type]=0
        }
        acc[type]+=amount
        return acc
    }, {});

    return Object.entries(grouped).map(([type, amount]) => ({
        name: type,
        value: amount
    }));
}

export default groupByType