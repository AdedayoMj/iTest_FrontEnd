export default interface IBackCardProps {
    name: string;
    currencies?: [
        {
            code: string;
        }
    ];
    timezones?: string;
    population?: number;
    region?: string;
    handleFlipCard: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleOpenSnack: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export default interface IFrontCardProps {
    name: string;
    likes?: boolean;
    capital?: string;
    flag?: string;
    handleFlipCard: (event: React.MouseEvent<HTMLButtonElement>) => void;
    handleOpenSnack: (event: React.MouseEvent<HTMLButtonElement>) => void;
}
