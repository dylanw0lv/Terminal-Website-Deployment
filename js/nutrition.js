
const nutrition = () => {
    addTextArea();
}

const fetchNutrition = () => {
    let query = document.querySelector('.input').textContent;
    query = query.replace("nutrition", "");
    query = query.replace(" ", "%20");
    let apiUrl = 'https://nutrition-by-api-ninjas.p.rapidapi.com/v1/nutrition?query=' + query;
    document.cookie = `url=${apiUrl}`;

    let url = `../php/nutrition-call.php`;

    fetch(url)
    .then(res => {
        try {
            return res.json()
        } catch (error) {
            typeWriterEffect("That is not a valid item. Try again.", ".output", 10);
        }
    })
    .then(data => {
        try {
            console.log(data)
            data = data[0];
            let foodName = data.name;
            let calories = data.calories;
            let servingSize = data.serving_size_g + "g";
            let totalFat = data.fat_total_g + "g";
            let saturatedFat = data.fat_saturated_g + "g";
            let protien = data.protein_g + "g";
            let carbs = data.carbohydrates_total_g + "g";
            let output = 
`Food: ${foodName}
Serving Size: ${servingSize}
Calories: ${calories}
Protien: ${protien}
Carbs: ${carbs}
Total Fat: ${totalFat}
Saturated Fat: ${saturatedFat}
`           
            typeWriterEffect(output, ".output", 10)
        } catch (error) {
            typeWriterEffect("That is not a valid item. Try again.", ".output", 10);
        }
        

    });
}
