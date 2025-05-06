import { Box } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { CustomTextField } from '../common/CustomInput';
import CustomButton from '../common/CustomButton';
import CustomModal from '../common/CustomModal';
import CustomDropdown from '../common/CustomDropdown';

const demandSchema = Yup.object().shape({
  title: Yup.string()
    .required('Başlık zorunludur')
    .min(3, 'Başlık en az 3 karakter olmalıdır'),
  description: Yup.string()
    .required('Açıklama zorunludur')
    .min(10, 'Açıklama en az 10 karakter olmalıdır'),
  categoryId: Yup.string()
    .required('Kategori seçimi zorunludur')
});

const CreateDemandForm = ({ open, onClose, onSubmit, categories }) => {
  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title="Yeni Talep"
    >
      <Formik
        initialValues={{
          title: '',
          description: '',
          categoryId: ''
        }}
        validationSchema={demandSchema}
        onSubmit={onSubmit}
      >
        {({ values, errors, touched, handleChange, handleBlur, isValid, dirty }) => (
          <Form>
            <Box sx={{ mt:1, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <CustomTextField
                required
                fullWidth
                name="title"
                label="Başlık"
                value={values.title}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.title && Boolean(errors.title)}
                helperText={touched.title && errors.title}
              />
              <CustomTextField
                required
                fullWidth
                name="description"
                label="Açıklama"
                multiline
                rows={4}
                value={values.description}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.description && Boolean(errors.description)}
                helperText={touched.description && errors.description}
              />
              <CustomDropdown
                required
                name="categoryId"
                label="Kategori"
                value={values.categoryId}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.categoryId && Boolean(errors.categoryId)}
                helperText={touched.categoryId && errors.categoryId}
                options={categories.map(category => ({
                  value: category.id,
                  label: category.desc
                }))}
              />
              <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                <CustomButton 
                  variant="outlined" 
                  onClick={onClose}
                >
                  İptal
                </CustomButton>
                <CustomButton 
                  type="submit"
                  disabled={!isValid || !dirty}
                  sx={{ 
                    bgcolor: '#1877F2', 
                    '&:hover': { bgcolor: '#1664D9' },
                    '&.Mui-disabled': {
                      bgcolor: '#E5E7EB',
                      color: '#9CA3AF'
                    }
                  }}
                >
                  Oluştur
                </CustomButton>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </CustomModal>
  );
};

export default CreateDemandForm; 