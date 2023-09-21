import React,{Fragment} from 'react'
import AvailabelMeals from './AvailabelMeals'
import MealsSummary from './MealsSummary'
function Meals() {
  return (
    <Fragment>
        <MealsSummary/>
        <AvailabelMeals/>
    </Fragment>
  )
}

export default Meals