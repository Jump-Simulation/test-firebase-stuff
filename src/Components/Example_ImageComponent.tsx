import { useAppContext } from "../App";

interface Example_ImageComponent_Props {
    given_FileName: string;
    given_CallLocation: string;
}

export default function Example_ImageComponent(props: Example_ImageComponent_Props) {
    const given_Context = useAppContext();

    return (<img
        style={{ height: "auto", width: "50%", maxWidth: "350px" }}
        src={`/assets/${props.given_FileName}`}
        alt={`No Image Found With File Name: ${props.given_FileName}`}
        onError={() => { given_Context.SendErrorReport("Asset Load Error", `The following asset failed to load: ${props.given_FileName}`, props.given_CallLocation); }}
    >
    </img>)

}