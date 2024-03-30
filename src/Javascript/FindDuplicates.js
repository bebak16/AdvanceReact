
const array = [1,2,3,2,1,4,5,6,7];
const duplicateValues = [];
const uniqueValues = [];

//Method 1 
const duplicatesWithFilter = array.filter((item, index) => array.indexOf(item) !== index);

//Method 2
const FindDuplicates = () => {
    const sortedArr = array.sort();
    
    sortedArr.forEach((itr, index) => {
        if(sortedArr[index] === sortedArr[index + 1]){
            duplicateValues.push(itr);
        }else{
            uniqueValues.push(itr);
        }

    })

return (
    <>
        <div>Original Array - {array.toString()}</div>
        <div>Method 1 </div>
        <div>duplicatesWithFilter - {duplicatesWithFilter.toString()}</div>
        <br></br>
        <div>Method 2 </div>
        <div>Duplicate values - {duplicateValues.toString()}</div>
        <div>Unique values - {uniqueValues.toString()}</div>
    </>

);
}


export default FindDuplicates;

