import{DataSource} from 'typeorm'
import { Iniciativa } from './entities/iniciativa'
export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "1234",
    database: "bd_tesis",
    entities: [Iniciativa],
    logging:true,
    synchronize:true
})