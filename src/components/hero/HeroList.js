import { useMemo } from "react";
import { getHeroesByBublisher } from "../../selectors/getHeroesByPublisher";
import { HeroCard } from "./HeroCard";


export const HeroList = ({ publisher }) => {

    const heroes = useMemo(() => getHeroesByBublisher(publisher), [publisher]);

    return (
        <div className="col">
            <div className="row rows-cols-1 row-cols-md-3 g-3 animate__animated animate__fadeIn">
                {
                    heroes.map(hero => (
                        <HeroCard key={hero.id}
                            {...hero}
                        />
                    ))
                }

            </div>
        </div>

    )
}
