import { KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { RealmProvider } from '@realm/react'
import LearningDictionaryModel from './lib/dao/models/learningDictionary.tsx'
import LearningDaysModel from './lib/dao/models/learningDays.tsx'
import ToastProvider from './lib/context/toast.tsx'
import PickerProvider from './lib/context/picker.tsx'
import DialogProvider from './lib/context/dialog.tsx'
import Layout from './lib/layout/index.tsx'
import CollectionWordModel from './lib/dao/models/collectionWord.tsx'

const providers = [ToastProvider, PickerProvider, DialogProvider]
const root = providers.reduce((child, Parent) => {
  return <Parent children={child} />
}, <Layout />)

const App = () => (
  <RealmProvider schema={[LearningDictionaryModel, LearningDaysModel, CollectionWordModel]}>
    <SafeAreaProvider>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
      >
        {root}
      </KeyboardAvoidingView>
    </SafeAreaProvider>
  </RealmProvider>
)

export default App
