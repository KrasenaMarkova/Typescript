function maintainCache(target: any, methodName: string, descriptor: PropertyDescriptor) {
    let cache: string[] = [];
    let lastUpdated: Date | null = null;

    const originalMethod = descriptor.value;

    descriptor.value = function () {
        // сегашната дата
        const currentMoment = new Date();

        if (!lastUpdated || (currentMoment.getTime() - lastUpdated.getTime()) > 5000) {
            // взимаме данните
            const data = originalMethod.call(this);
            // запазваме ги в кеша като правим копие
            cache = data.slice();
            // отбелязваме, че имаме нова последна дата на ъпдейт, която е текущата дата
            lastUpdated = new Date();
            // връщаме данните
            return data;
        } else {
            // If the data is newer than 5 seconds, print 'Returned from cache', 
            // then return the cached copy and do not call getWeatherData
            console.log('Returned from cache');
            return cache;
        }
    }

    return descriptor;
}

class MockWeatherDataService {
    private weatherData: string[] = [
        'Sunny 8° to 20°',
        'Partially Cloudy 7° to 19°',
        'Sunny 5° to 18°'
    ];

    addWeatherData(data: string){ this.weatherData.push(data);  }
    
    @maintainCache
    getWeatherData() { return this.weatherData; }
}


let service = new MockWeatherDataService();
console.log(service.getWeatherData())
console.log(service.getWeatherData())
service.addWeatherData('Partially Cloudy 5° to 11°');
console.log(service.getWeatherData())

//7 seconds later
setTimeout(() => console.log(service.getWeatherData()), 7000)
