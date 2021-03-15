import { WeatherData } from "../header"
import {Divider,Card} from 'antd'
import styled from 'styled-components'

interface WeatherProps{
	data: WeatherData[] | null;
	error:Error | null;

}

interface CityProps {
	item: WeatherData
}

export const Weather = ({ data,error }: WeatherProps) => {
	return (
		<WeatherContainer>
			{error ? error.message:null}
			{
			 data?.map((item)=>{
					return <City item={item}/>
				})
			}
		</WeatherContainer>
	)
}


const City = ({ item }:CityProps)=>{
	return (
		<CityContainer>
			<h2 className="city-title">{item.title}</h2>
			<Divider/>
			<DayWeatherContainer>
				{
					item.consolidated_weather?.map((item,index)=>{
						return <Card className={`${index === 0 ? "today-container" : "day-container"}`} key={item.id}>
								<h3>{item.applicable_date} </h3>
								<div>{item.weather_state_name}</div>
								<div>Temp:{item.min_temp.toFixed()} Degree to {item.max_temp.toFixed()} Degree</div>
						</Card>
					})
				}
			</DayWeatherContainer>
		</CityContainer>
		
	)
}

const WeatherContainer = styled.div`
	width:80%;
	min-height:70vh;
	padding:1rem;
	margin-top:10rem;
	display:flex;
	flex-direction:column;
	justify-content:center;
	align-items:center
`

const CityContainer = styled.div`
	width:80%;
	min-height:500px;
	margin-bottom:3rem;
	.city-title{
		text-align:left;
	}
`

const DayWeatherContainer = styled.div`
	display:grid;
	grid-template-columns:1fr 1fr 1fr;
	grid-gap:1rem;
	
	.day-container{
		min-width:200px;
		min-height:200px;
	}
	.today-container{
		min-width:200px;
		min-height:200px;
		background-color:#fafafa;
	}
`


