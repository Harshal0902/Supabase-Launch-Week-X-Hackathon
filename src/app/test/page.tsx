import React from 'react'

export default function Page() {
  return (
    <div>
      <script type='module' src='https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js' async />

      <div className='bg-[#020817] p-2 border-2 border-accent rounded-md mx-4 md:mx-36'>
        {/* @ts-ignore */}
        <model-viewer src="/models/apartment/scene.gltf"
          quick-look-browsers='safari chrome'
          camera-controls ar ar-modes='webxr scene-viewer quick-look'
          shadow-intensity='1' shadowSoftness='1' exposure='1' ar-placement='floor'
          ar-scale='auto' min-camera-orbit='auto auto auto' max-camera-orbit='auto auto auto'
          alt='A 3D model'
          xr-environment
          style={{ width: '100%', height: '420px' }}
        >
          <button slot='ar-button' className='absolute top-0 right-0 text-black flex items-center bg-gray-100 border border-1 border-gray-300 p-1 rounded'>
            View in AR
          </button>

          {/* @ts-ignore */}
        </model-viewer>
      </div>

    </div>
  )
}
