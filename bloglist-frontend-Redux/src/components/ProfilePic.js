import axios from 'axios'
import React, { ChangeEvent, useState, useRef, useEffect } from 'react'
import {
  CropperRef,
  Cropper,
  CircleStencil,
  CropperPreview,
} from 'react-advanced-cropper'
import { useDispatch } from 'react-redux'

import './ProfilePic.css'
import { updateUser } from '../reducers/usersReducer'
import { Navigate } from 'react-router-dom'

export const ProfilePic = ({ userImage }) => {
  const dispatch = useDispatch()
  const inputRef = useRef(null)
  const cropperRef = useRef(null)

  // const [coordinates, setCoordinates] = useState(null)
  //const image2 = { src: userImage.src }

  const ID = userImage.userID
  const [image, setImage] = useState(null)
  useEffect(() => {
    async function getImage() {
      const k = await fetch(userImage.src, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
      })
      setImage({ blob: k.url, src: k.url })
    }
    getImage()
  }, [userImage])
  const username = userImage.username
  console.log(image)
  //console.log(image)
  const onUpload = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const onLoadImage = (event) => {
    console.log('AICI E PROBLEMA')
    // Reference to the DOM input element
    const files = event.target.files
    // console.log('AICI E PROBLEMA', files)
    // Ensure that you have a file before attempting to read it
    if (files && files[0]) {
      // Create the blob link to the file to optimize performance:
      const blob = URL.createObjectURL(files[0])

      // Get the image type from the extension. It's the simplest way, though be careful it can lead to an incorrect result:

      setImage({
        src: blob,
        type: files[0].type,
      })
    }

    // Clear the event target value to give the possibility to upload the same image:
    event.target.value = ''
  }

  const checkResults = async () => {
    console.log('CHECK RESULTS')
    const k = cropperRef.current
    console.log(k.getCoordinates(), k.getCanvas())
    const canvas = cropperRef.current?.getCanvas()
    if (canvas) {
      const form = new FormData()
      canvas.toBlob(
        async (blob) => {
          if (blob) {
            form.append('profilepic', blob)
            console.log(form)
            //const result = await axios.put(`/api/users/${ID}/edit`, form)
            const k = await dispatch(updateUser(ID, form))
            console.log(k)
            // userImage.closeModal(false)

            //console.log(result.data)
            userImage.OK(k.savedUser.profilePicUrl)
          }
        },
        'image/jpeg',
        1,
      )
    }
  }

  const [previewState, setPreviewState] = useState({
    state: null,
    image: null,
    transitions: null,
  })

  const onUpdate = () => {
    setPreviewState({
      state: cropperRef.current.getState(),
      image: cropperRef.current.getImage(),
      transitions: cropperRef.current.getTransitions(),
      loaded: cropperRef.current.isLoaded(),
      loading: cropperRef.current.isLoading(),
    })
  }

  const usePhoto = () => {
    //const k = cropperRef.current
    //console.log(k.getCoordinates(), k.getCanvas())
    const canvas = cropperRef.current?.getCanvas()
    if (canvas) {
      canvas.toBlob(async (blob) => {
        if (blob) {
          userImage.OK(blob)
        }
      })
    }
  }

  return (
    <div
      className="profilePic-container"
      /*style={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}*/
    >
      <div
        className="preview-result-container"
        /*style={{
          display: 'flex',
          flexDirection: 'column',
        }}*/
      >
        <CropperPreview
          {...previewState}
          className="preview-result-example"
          /*style={{
            height: '50px',

            borderRadius: '50%',
          }}*/
        />
        <div className="preview-user">
          <div className="username"> {username} </div>
          <div className="text-preview">
            {' '}
            This is a preview of your profile appearance{' '}
          </div>
        </div>
        <button
          className="btn btn-close"
          style={{ position: 'absolute', right: '2%' }}
          onClick={() => userImage.closeModal(false)}
        ></button>
      </div>
      <div>
        <Cropper
          className="upload-example__cropper"
          src={image && image.src}
          ref={cropperRef}
          stencilComponent={CircleStencil}
          onUpdate={onUpdate}
          style={{ height: '70vh', maxHeight: '70vh' }}
        />
        <div className="buttons-wrapper">
          <button className="button" onClick={onUpload}>
            <input
              ref={inputRef}
              type="file"
              accept="image/jpeg, image/png, image/jpg"
              onChange={onLoadImage}
              style={{ display: 'none' }}
            />
            Upload image
          </button>
          <button onClick={checkResults}> Use this as profile </button>
        </div>
      </div>
    </div>
  )
  /*
  return (
    <div className="upload-example" style={{ height: '100%' }}>
      <Cropper
        className="upload-example__cropper"
        src={image && image.src}
        ref={cropperRef}
        stencilComponent={CircleStencil}
        onUpdate={onUpdate}
      />
      <div
        className="preview-result-example__previews"
        style={{
          position: 'absolute',
          top: '0',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <CropperPreview
          {...previewState}
          className="preview-result-example__preview preview-result-example__preview--small"
          style={{
            height: '50px',

            borderRadius: '50%',
          }}
        />
        <div> User </div>
      </div>
      <div className="buttons-wrapper">
        <button className="button" onClick={onUpload}>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={onLoadImage}
            style={{ display: 'none' }}
          />
          Upload image
        </button>
        <button onClick={checkResults}> console.log results </button>
        <button onClick={() => userImage.OK(image)}> Set this as photo </button>
      </div>
    </div>
  )*/
}

export default ProfilePic
