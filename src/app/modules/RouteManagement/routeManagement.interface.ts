interface IPickupPoints {
  name: string;
  address: string;
  stopOrder: number;
}

export interface ICreateRoute {
  name: string;
  startPoint: string;
  endPoint: string;
  monthlyFee: number;
  pickupPoints: IPickupPoints[];
}
