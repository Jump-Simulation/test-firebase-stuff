interface Text_PageTitle_Props {
    textToRender: string;
}

export default function Text_PageTitle(props: Text_PageTitle_Props) {

    return (
        <div>
            {props.textToRender}
        </div>
    )

}