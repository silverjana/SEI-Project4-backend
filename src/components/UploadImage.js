import { useState } from "react"
import { Container, FormGroup } from "react-bootstrap"

const UploadImage = ({setData, data}) => {

  const [loading, setLoading] = useState(false)

  const Upload = async (e) => {
    const files = e.target.files
    const formData = new FormData()
    formData.append( "file", files[0])
    formData.append("upload_preset", "erm5g0re")
    setLoading(true)
    const res = await fetch ("https://api.cloudinary.com/v1_1/silverjana/image/upload",
    {
      method: "POST",
      body: formData,
    }
    )

    const File = await res.json()
    console.log(File.secure_url)
    setData({ ...data, images: File.secure_url })
    setLoading(false)
  }
  return ( <div>
    <Container>
      <h5>Upload image</h5>
      <FormGroup>
        <input type="file" name="file" placeholder="Upload image here" onChange={Upload} />
        <br />
        {loading ? (<h3>Loading...</h3>) : <img src={data.images} style={{width: "200px"}} alt=''/>}
      </FormGroup>
    </Container>
  </div>)
}




export default UploadImage