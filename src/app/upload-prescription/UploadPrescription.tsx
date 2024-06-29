// pages/upload-prescription.tsx
import React, { useState } from 'react';
import prisma from '../../../prisma/lib/prisma';

interface UploadPrescriptionProps {
  userId: string;
}

const UploadPrescription: React.FC<UploadPrescriptionProps> = ({ userId }) => {
  const [image, setImage] = useState<File | null>(null);
  const [url, setUrl] = useState<string>('');
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async () => {
    if (!image) {
      setError('Please select an image file to upload.');
      return;
    }

    setUploading(true);
    setError(null);

    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'ml_default');
    data.append('cloud_name', 'dwja0fcgm');

    try {
      const response = await fetch('https://api.cloudinary.com/v1_1/dwja0fcgm/image/upload', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      const result = await response.json();
      const { secure_url, original_filename } = result;

      const res:any = await fetch("/api/upload-prescription", {
        method:"POST",
        body: JSON.stringify({file_url:secure_url, file_name:original_filename, userId: userId})
      });
    
      const prescriptionData = await res.json();

      console.log('Prescription saved:', prescriptionData);

      setUrl(result.url);
    } catch (err) {
      setError('Failed to save prescription');
      console.error('Error:', err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-semibold mb-4">Upload Prescription</h1>
      <div className="mb-4">
        <input
          type="file"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              setImage(e.target.files[0]);
            } else {
              setImage(null);
            }
          }}
        />
        <button
          onClick={uploadImage}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mt-4"
          disabled={uploading}
        >
          {uploading ? 'Uploading...' : 'Upload'}
        </button>
      </div>
      {error && <p className="text-red-500 mt-4">{error}</p>}
      {url && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Uploaded Image</h2>
          <img src={url} alt="Uploaded prescription" className="max-w-full h-auto" />
        </div>
      )}
    </div>
  );
};

export default UploadPrescription;
