export class Farm {

    private readonly id?: number ;
    private farmName: string;
    private farmSize: number;
    private framLocation: string;
    private overAllStatus: number ;
     weatherReadings!: WeatherReadings  ;
    private fields?: Field[] ;

    
   public   getId(): any   {
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

 

    public getFields(): Field[] | undefined {
        return this.fields;
    }

    setWeatherReadings(weatherReadings: any): void {
        this.weatherReadings = weatherReadings;
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
  temperature!: number;
  humidity!: number;
  windSpeed!: number;
  precipitation!: number;
  constructor(
    temperature: number,
    humidity: number,
    windSpeed: number,
    precipitation: number
  ) {
    this.temperature = temperature;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
    this.precipitation = precipitation;
  }
    
}

export class Field {
    private readonly id: number ;
    private fieldName: string;
    private fieldSize: number;
    private cropType: string;
    private fieldCondition: number;
    private soilData?: SoilData;
    private recommendation ?:Recommendation[];

    constructor(
        fieldName: string,
        fieldSize: number,
        cropType: string,
        
    ){
        
        this.fieldName = fieldName;
        this.fieldSize = fieldSize;
        this.cropType = cropType;
        this.fieldCondition =0;
       
        
this.id = 0;

    }

     public getId(): number  {
        return this.id;
    }

    public getFieldName(): string {
        return this.fieldName;
    }

    public getFieldSize(): number {
        return this.fieldSize;
    }

    public getCropType(): string {
        return this.cropType;
    }

    public getFieldCondition(): number | undefined {
        return this.fieldCondition;
    }

    public getSoilData(): SoilData | undefined {
        return this.soilData;
    }

    public getRecommendation(): Recommendation[] | undefined {
        return this.recommendation;
    }





    public setFieldName(fieldName: string): void {
        this.fieldName = fieldName;
    }

    public setFieldSize(fieldSize: number): void {
        this.fieldSize = fieldSize;
    }

    public setCropType(cropType: string): void {
        this.cropType = cropType;
    }

    public setFieldCondition(fieldCondition: number): void {
        this.fieldCondition = fieldCondition;
    }

    public setSoilData(soilData: SoilData): void {
        this.soilData = soilData;
    }

    public setRecommendation(recommendation: Recommendation[]): void {
        this.recommendation = recommendation;
    }

   
}

export class SoilData {
    id?: number;
    soilPH: number;
    nitrogen: number;
    phosphorus: number;
    potassium: number;
    soilTexture: string;
    soilMoisture: number;
    soilOrganicMatter: number;

    constructor(
        soilPH: number,
        nitrogen: number,
        phosphorus: number,
        potassium: number,
        soilTexture: string,
        soilMoisture: number,
        soilOrganicMatter: number
    ){
      
        this.soilPH = soilPH;
        this.nitrogen = nitrogen;
        this.phosphorus = phosphorus;
        this.potassium = potassium;
        this.soilTexture = soilTexture;
        this.soilMoisture = soilMoisture;
        this.soilOrganicMatter = soilOrganicMatter;
    }
 getSoilPH(): number {
    return this.soilPH;
}

getNitrogen(): number {
    return this.nitrogen;
}

getPhosphorus(): number {
    return this.phosphorus;
}

getPotassium(): number {
    return this.potassium;
}

getSoilTexture(): string {
    return this.soilTexture;
}

getSoilMoisture(): number {
    return this.soilMoisture;
}

getSoilOrganicMatter(): number {
    return this.soilOrganicMatter;
}


}

export interface Recommendation {
    id: number;
    name: string;
    yield: number;
    health: number;
    status: string;

}

