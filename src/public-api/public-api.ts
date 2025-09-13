import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()
export class PublicApi {

    @PrimaryColumn()
    key: string;

    @Column({ type: 'jsonb' })
    response: object;
}
