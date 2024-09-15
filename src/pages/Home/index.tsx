import Card from "../../Components/Card";
import { useRecoilValue } from "recoil";
import { IProduct } from "../../interfaces/product";

import { productsListState } from "../../state/globalState";
import { useParams } from "react-router-dom";
import { Icon } from "@iconify-icon/react/dist/iconify.js";
import { useState } from "react";


const Home = () => { 
    const { category } = useParams();
    const productsState = useRecoilValue<IProduct[]>(productsListState);
    const [text, setText] = useState('');

    const handleText = (e: React.ChangeEvent<HTMLInputElement>) => {
        setText(e.target.value);
    }

   
    return ( 
        <>
            <div className="relative flex flex-row w-svw justify-center items-center px-48 pt-10">
                <div className="relative w-1/4">
                    <div className="absolute flex flex-col justify-center items-center bg-transparent h-9 top-0 left-1">
                        <Icon icon="ri:search-2-fill" width="1.2rem" height="1.2rem"  style={{color: '#64748B'}} />
                    </div>
                    <input 
                        className={`
                            bg-slate-200 w-full h-9 rounded-lg 
                            p-3 pl-8 border border-none hover:border-none shadow-sm 
                            focus:outline-none focus:ring-0 focus:border-transparent 
                            hover:border-transparent focus:bg-slate-300
                            placeholder-slate-500
                            text-slate-900
                            text-sm
                            `} 
                        type="text" 
                        name="" 
                        id="" 
                        placeholder="solid gold" 
                        value={text}
                        onChange={handleText}
                    />
                </div>

            </div>
            <div className="grid grid-flow-row grid-cols-4 gap-x-3 gap-y-5 justify-center px-48 py-10 w-svw">
                
                {
                    productsState.filter((product) => product.category === category || category === 'all')
                        .map((product) => (
                            product.title.toLowerCase().includes(text.toLowerCase()) &&
                            <Card key={product.id} product={product} />
                        ))
                }
            </div>
        </>
     );
}

export default Home;
