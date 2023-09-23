import * as yup from 'yup';

const validFileExtensions: { [key: string]: string[] } = {
  image: ['jpg', 'png', 'jpeg'],
};

const MAX_FILE_SIZE = 1024 * 1024 * 5;

function isValidFileType(
  value: File | undefined | string,
  fileType: string
): boolean | undefined {
  if (typeof value === 'string') {
    return true;
  }
  return (
    value &&
    validFileExtensions[fileType].indexOf(
      value.name.split('.').pop()!.toLowerCase()
    ) > -1
  );
}

const updateUserSchema = yup.object().shape({
  name: yup
    .string()
    .required('Name is required')
    .min(3, 'Name must be at least 3 characters long'),
  bio: yup
    .string()
    .required('Bio is required')
    .max(150, 'Bio must be at most 150 characters long'),
  phone: yup
    .string()
    .required('Phone number is required')
    .matches(
      /^[0-9+() -]+$/,
      'Phone must contain only numbers and allowed characters'
    )
    .min(6, 'Phone must be at least 6 digits long')
    .max(20, 'Phone must be at most 20 digits long'),
  image: yup
    .mixed()
    .test('is-mixed-type', 'Profile image is required', (value) => {
      if (value instanceof File) {
        return true;
      }
      if (typeof value === 'string') {
        return true;
      }
      return false;
    })
    .test('is-valid-type', 'Not a valid image type', (value) =>
      isValidFileType(value as File, 'image')
    )
    .test(
      'is-valid-size',
      `Max allowed size is ${MAX_FILE_SIZE}`,
      (value) =>
        typeof value === 'string' || (value as File)?.size <= MAX_FILE_SIZE
    ),
});

export default updateUserSchema;
