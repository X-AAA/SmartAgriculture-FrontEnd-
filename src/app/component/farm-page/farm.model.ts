export class Farm {
    private id: number =0 ;
    private farmName: string;
    private farmSize: number;
    private framLocation: string;
    private overAllStatus: number ;
    private weatherReadings?: WeatherReadings  ;
    private fields?: Field[]  ;

  


    

   public   getId(): number   {
        return this.id;
    }

    public getFarmName(): string {
        return this.farmName;
    }

    public getFarmSize(): number {
        return this.farmSize;
    }

    public getFarmLocation(): string {
        return this.framLocation;
    }

    public getOverAllStatus(): number | undefined {
        return this.overAllStatus;
    }

    public getWeatherReadings(): WeatherReadings | undefined {
        return this.weatherReadings;
    }

    public getFields(): Field[] | undefined {
        return this.fields;
    }
     constructor (     
        farmName: string,
        farmSize: number,
        framLocation: string,
       
       
        
    ) {
        
        this.farmName = farmName;
        this.farmSize = farmSize;
        this.framLocation = framLocation;
       this.overAllStatus =0;
      
    
    }
    
   
   
    
}

export class WeatherReadings {
    id: number | undefined ;
    temperature: number;
  humidity: number;
  windSpeed: number;
  precipition: number;
    constructor(
       id: number|undefined,
        temperature: number,
        humidity: number,
        windSpeed: number,
        precipition: number
    ){
       
        this.temperature = temperature;
        this.humidity = humidity;
        this.windSpeed = windSpeed;
        this.precipition = precipition;
    }
}

export class Field {
    id: number;
    fieldName: string;
    fieldSize: number;
    cropType: string;
    fieldCondition: number;
    soilData: SoilData;
    recommendation :Recommendation[];

    constructor(
        id: number,
        fieldName: string,
        fieldSize: number,
        cropType: string,
        fieldCondition: number,
        soilData: SoilData,
        recommendation :Recommendation[]
    ){
        this.id = id;
        this.fieldName = fieldName;
        this.fieldSize = fieldSize;
        this.cropType = cropType;
        this.fieldCondition = fieldCondition;
        this.soilData = soilData;
        this.recommendation = recommendation;
        

    }

}

export class SoilData {
    id: number;
    soilPH: number;
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    soilTexture: string;
    soilMoisture: number;
    soilOrganicMatter: number;

    constructor(
        id: number,
        soilPH: number,
        nitrogen: number,
        phosphorus: number,
        potassium: number,
        soilTexture: string,
        soilMoisture: number,
        soilOrganicMatter: number
    ){
        this.id = id;
        this.soilPH = soilPH;
        this.nitrogen = nitrogen;
        this.phosphorus = phosphorus;
        this.potassium = potassium;
        this.soilTexture = soilTexture;
        this.soilMoisture = soilMoisture;
        this.soilOrganicMatter = soilOrganicMatter;
    }
}

export interface Recommendation {
    id: number;
    name: string;
    yield: number;
    health: number;
    status: string;

}

