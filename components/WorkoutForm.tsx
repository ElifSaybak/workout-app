
import { useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { PressableText } from "./styled/PressableText";

export type ExerciseForm = {
  name: string,
  duration: string,
  type: string,
  reps?: string
}

type WorkoutProps = {
  onSubmit: (form: ExerciseForm) => void
}

const selectionItems = ["exercise", "break", "stretch"]

export default function WorkoutForm({
  onSubmit
}: WorkoutProps) {
  const { control, handleSubmit } = useForm();
  const [ isSelectionOn, setSelectionOn ] = useState(false);

  return (
    <View style={styles.container}>
      <Text>
        Exercise Form
      </Text>
      <View>
        <View style={styles.rowContainer}>
          <Controller
            control={control}
            rules={{
              required: true
            }}
            name="name"
            render={({ field: {onChange, value}}) =>
              <TextInput
                onChangeText={onChange}
                value={value}
                style={styles.input}
                placeholder="Name"
              />
            }
          />
          <Controller
            control={control}
            rules={{
              required: true
            }}
            name="duration"
            render={({ field: {onChange, value}}) =>
              <TextInput
                onChangeText={onChange}
                value={value}
                style={styles.input}
                placeholder="Duration"
              />
            }
          />
        </View>
        <View style={styles.rowContainer}>
          <Controller
            control={control}
            name="reps"
            render={({ field: {onChange, value}}) =>
              <TextInput
                onChangeText={onChange}
                value={value}
                style={styles.input}
                placeholder="Repetitions"
              />
            }
          />
          <Controller
            control={control}
            rules={{
              required: true
            }}
            name="type"
            render={({ field: {onChange, value}}) =>
              <View style={{flex: 1}}>
                { isSelectionOn ?
                  <View>
                    { selectionItems.map(selection =>
                      <PressableText
                        key={selection}
                        style={styles.selection}
                        text={selection}
                        onPressIn={() => setSelectionOn(false)}
                      />
                    )}
                  </View> :
                  <TextInput
                    onPressIn={() => setSelectionOn(true)}
                    style={styles.input}
                    placeholder="Type"
                  />
                }
              </View>
            }
          />
        </View>
        <PressableText
          text="Submit"
          onPress={handleSubmit((data) => {
            onSubmit(data as ExerciseForm);
          })}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10
  },
  input: {
    flex: 1,
    margin: 2,
    borderWidth: 1,
    height: 30,
    padding: 5,
    borderRadius: 5,
    borderColor: "rgba(0,0,0, 0.4)",
  },
  rowContainer: {
    flexDirection: "row"
  },
  selection: {
    margin: 2,
    padding: 3,
    alignSelf: "center"
  }
})