import React,{useEffect, useState} from "react";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";
import classes from "./AvailabelMeals.module.css";
// const DUMMY_MEALS = [
//   {
//     id: "m1",
//     name: "Sushi",
//     description: "Finest fish and veggies",
//     price: 22.99,
//   },
//   {
//     id: "m2",
//     name: "Schnitzel",
//     description: "A german specialty!",
//     price: 16.5,
//   },
//   {
//     id: "m3",
//     name: "Barbecue Burger",
//     description: "American, raw, meaty",
//     price: 12.99,
//   },
//   {
//     id: "m4",
//     name: "Green Bowl",
//     description: "Healthy...and green...",
//     price: 18.99,
//   },
// ];

   
 const URL = "https://food-orders-ccc7a-default-rtdb.firebaseio.com/meals.json"
 
function AvailabelMeals() {

  const [meals,setMeals] = useState([])
  const [isLoading,setIsloading] = useState(true)
  const [httpError,setHttpError] = useState(false)

  
 
 
useEffect(()=>{

  const fetchdata = async (api) =>{
    const response = await fetch(api);

    if(!response.ok){
       throw new Error("something went worng!.")
    }
    const data = await response.json();
    
    const loadedMeals = []
    for(const key in data){
      loadedMeals.push({
        id:key,
        name:data[key].name,
        description:data[key].description,
        price:data[key].price,

      });
    };
    setMeals(loadedMeals)
    setIsloading(false)
   }

  
    fetchdata(URL).catch((error) =>{
      setIsloading(false)
      setHttpError(error.message)
    })
},[]);

   if(isLoading){
     return <section className={classes.mealsLoading}>
      <p>Loading...</p>
     </section>
   }

   if(httpError){
    return <section className={classes.MealsError}>
      <p>{httpError}</p>
    </section>
   }

  const mealsList = meals.map((meal) => (
    <MealItem
    key={meal.id}
    id={meal.id}
    name={meal.name}
    description={meal.description}
    price={meal.price}
    />
  ));
  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
}

export default AvailabelMeals;
