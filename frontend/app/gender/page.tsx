import UploadForm from '@/components/UploadForm'

const GenderPage = () => {
  return (
    <main className='wrapper container'>
      <div className='mx-auto max-w-180 space-y-10 py-20'>
        <section className='flex flex-col gap-5 text-center'>
          <h1 className='text-3xl font-bold'>Gender Prediction</h1>
          <p className='text-lg text-muted-foreground'>
            Upload an image of a face to predict the gender.
          </p>
        </section>

        <UploadForm />
      </div>
    </main>
  )
}

export default GenderPage
