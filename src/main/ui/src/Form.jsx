import React, {useState, useRef, useEffect, useCallback} from "react";

const Form = () => {

    return (

        <form method="POST" encType="multipart/form-data"
              action="/api/creat">
            File to upload: <input type="file" name="file"/>
            <br/> pointCoordinates:
            <input type="text" name="pointCoordinates"/>
                <br/> <br/>
            <br/> description:
            <input type="text" name="description"/>
            <br/> <br/>
            <input type="submit" value="Upload"/> Press here to upload the file!
        </form>
);
};

export default Form;
