import { Finall } from "./styles.js";

export function Newscard ({ item }) {
    const tempimg = "https://i.pinimg.com/564x/71/2e/e7/712ee7f92fba6feac222dd76d46dd209.jpg";
    return (
        <Finall to = "#" onClick={() => {
            window.open(item.link);
        }}>
            <div>
                <img src={(item.image ? item.image : tempimg)} alt="img"/>
            </div>
            <section>
                {/* <span>{item.}</span> */}
                <p>{item.title}</p>
            </section>
        </Finall>
    );
};