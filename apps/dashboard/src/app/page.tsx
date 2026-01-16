import { NextPage } from 'next'

import { UploadCsvButton } from './_components/upload-csv-button'

const Home: NextPage = () => {
  return (
    <div>
      <UploadCsvButton />
    </div>    
  )
}

export default Home
