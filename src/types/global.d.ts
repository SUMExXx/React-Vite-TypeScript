type User = {
    user_id: number
    username: string
    first_name: string
    last_name: string
    email: string
    is_admin: boolean
}

type Domain = {
    domain_id: number
    domain_name: string
    prompts: string
}

type Dataset = {
    dataset_id: number;
    dataset_name: string;
};

type DomainDataset = {
    domain_id: number
    domain_name: string
    datasets: Dataset[]
}

type DataSourceDataset = {
    dataset_id: number
    name: string
    file_type: string
    domain_id: number
}