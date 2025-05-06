import { Box } from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { CustomTextField } from '../common/CustomInput';
import CustomButton from '../common/CustomButton';
import CustomModal from '../common/CustomModal';
import CustomDropdown from '../common/CustomDropdown';
import { useTranslation } from 'react-i18next';

const CreateDemandForm = ({ open, onClose, onSubmit, categories }) => {
  const { t } = useTranslation();

  const demandSchema = Yup.object().shape({
    title: Yup.string()
      .required(t('validation.required', { field: t('demand.title') }))
      .min(3, t('validation.minLength', { field: t('demand.title'), min: 3 })),
    description: Yup.string()
      .required(t('validation.required', { field: t('demand.description') }))
      .min(10, t('validation.minLength', { field: t('demand.description'), min: 10 })),
    categoryId: Yup.string()
      .required(t('validation.required', { field: t('common.category') }))
  });

  return (
    <CustomModal
      open={open}
      onClose={onClose}
      title={t('demand.newDemand')}
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
                label={t('demand.title')}
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
                label={t('demand.description')}
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
                label={t('common.category')}
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
                  {t('common.cancel')}
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
                  {t('common.create')}
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