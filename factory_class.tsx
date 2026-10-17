interface Transport {

    deliver(cargo: string): void ;
    costPerKm(): number ;

}

class Truck implements Transport { 
    deliver(cargo: string): void {

    console.log(`🚚 Delivering ${cargo} by road`);

    }

    costPerKm(): number {

    return 2;

    }

}

class TransportFactory {
    createTransport(): Transport {
        return new Truck();
    }
}

class Logistics {
    constructor(private factory: TransportFactory = new TransportFactory()) {}

    planDelivery(cargo: string): void {

    console.log(`Planning delivery of ${cargo}...
    `);

    const truck = this.factory.createTransport();

    truck.deliver(cargo);

    console.log("Delivery logged.");

    }

    estimateCost(km: number): number {
    const truck = this.factory.createTransport();

    return truck.costPerKm() * km;

    }

}
new Logistics().planDelivery("cement");