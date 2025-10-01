import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { useNavigate } from 'react-router-dom'

import { RootState } from '../../store'

import {
  clear,
  closeOrder,
  closePayment,
  openPayment
} from '../../store/reducers/Cart'

import { usePurchaseMutation } from '../../services/api'

import {
  OrderContainer,
  OrderTitle,
  OrderDescription,
  OrderButton,
  OrderRow,
  LabelContainer,
  ErrorMessage
} from './styles'

const Checkout = () => {
  const navigate = useNavigate()
  const { isPayment } = useSelector((state: RootState) => state.cart)
  const dispatch = useDispatch()
  const [purchase, { data, isSuccess, error }] = usePurchaseMutation()

  const fecharPagamento = () => dispatch(closePayment())
  const fecharPedido = () => dispatch(closeOrder())
  const abrirPagamento = () => dispatch(openPayment())
  const limparPedido = () => dispatch(clear())

  const FinishOrder = () => {
    fecharPagamento()
    navigate('/')
    limparPedido()
  }

  const formikEntrega = useFormik({
    initialValues: {
      name: '',
      endereco: '',
      cidade: '',
      cep: '',
      numero: '',
      complemento: ''
    },
    validationSchema: Yup.object({
      name: Yup.string().required('O nome do destinatário é obrigatório'),
      endereco: Yup.string().required('O endereço é obrigatório'),
      cidade: Yup.string().required('A cidade é obrigatória'),
      cep: Yup.string()
        .required('O CEP é obrigatório')
        .matches(/^[0-9]{8}$/, 'O CEP deve ter 8 dígitos'),
      numero: Yup.string().required('O número do endereço é obrigatório'),
      complemento: Yup.string()
    }),
    onSubmit: () => {
      abrirPagamento()
    }
  })

  const formikPagamento = useFormik({
    initialValues: {
      cardName: '',
      cardNumber: '',
      cvv: '',
      dueMonth: '',
      dueYear: ''
    },
    validationSchema: Yup.object({
      cardName: Yup.string()
        .required('O nome no cartão é obrigatório')
        .min(3, 'O nome deve ter pelo menos 3 caracteres'),
      cardNumber: Yup.string()
        .required('O número do cartão é obrigatório')
        .matches(/^[0-9]{16}$/, 'O número do cartão deve ter 16 dígitos'),
      cvv: Yup.string()
        .required('O CVV é obrigatório')
        .matches(/^[0-9]{3}$/, 'O CVV deve ter 3 dígitos'),
      dueMonth: Yup.string()
        .required('O mês de vencimento é obrigatório')
        .matches(
          /^(0[1-9]|1[0-2])$/,
          'O mês deve conter dois dígitos, de 01 a 12 (ex: 01, 12)'
        ),
      dueYear: Yup.string()
        .required('O ano de vencimento é obrigatório')
        .matches(/^[0-9]{4}$/, 'O ano deve estar no formato AAAA')
    }),
    onSubmit: (values) => {
      purchase({
        products: [
          {
            id: 1,
            price: 150
          }
        ],
        delivery: {
          receiver: formikEntrega.values.name,
          address: {
            descricao: formikEntrega.values.endereco,
            city: formikEntrega.values.cidade,
            zipcode: formikEntrega.values.cep,
            number: Number(formikEntrega.values.numero),
            complement: formikEntrega.values.complemento
          }
        },
        payment: {
          card: {
            name: values.cardName,
            number: values.cardNumber,
            code: Number(values.cvv),
            expires: {
              month: Number(values.dueMonth),
              year: Number(values.dueYear)
            }
          }
        }
      })
    }
  })

  if (error) {
    return (
      <OrderContainer>
        <OrderTitle>Erro ao realizar o pedido</OrderTitle>
        <OrderDescription>
          Ocorreu um erro ao realizar o pedido. Por favor, tente novamente mais
          tarde.
        </OrderDescription>
        <OrderButton onClick={() => fecharPedido()}>Voltar</OrderButton>
      </OrderContainer>
    )
  }

  return (
    <OrderContainer>
      {data && isSuccess ? (
        <>
          <OrderTitle>Pedido realizado - {data.orderId}</OrderTitle>
          <OrderDescription>
            Estamos felizes em informar que seu pedido já está em processo de
            preparação e, em breve, será entregue no endereço fornecido.
          </OrderDescription>
          <OrderDescription>
            Gostaríamos de ressaltar que nossos entregadores não estão
            autorizados a realizar cobranças extras.
          </OrderDescription>
          <OrderDescription>
            Lembre-se da importância de higienizar as mãos após o recebimento do
            pedido, garantindo assim sua segurança e bem-estar durante a
            refeição.
          </OrderDescription>
          <OrderDescription>
            Esperamos que desfrute de uma deliciosa e agradável experiência
            gastronômica. Bom apetite!
          </OrderDescription>

          <OrderButton className="marginTop" onClick={() => FinishOrder()}>
            Concluir
          </OrderButton>
        </>
      ) : (
        <>
          {isPayment ? (
            <form id="paymentForm" onSubmit={formikPagamento.handleSubmit}>
              <OrderTitle>Pagamento - valor a pagar R$ 0</OrderTitle>

              <OrderRow>
                <LabelContainer>
                  <label htmlFor="cardName">Nome do cartão</label>
                  <input
                    type="text"
                    id="cardName"
                    name="cardName"
                    value={formikPagamento.values.cardName}
                    onChange={formikPagamento.handleChange}
                    onBlur={formikPagamento.handleBlur}
                  />
                  {formikPagamento.touched.cardName &&
                    formikPagamento.errors.cardName && (
                      <ErrorMessage>
                        {formikPagamento.errors.cardName}
                      </ErrorMessage>
                    )}
                </LabelContainer>
              </OrderRow>

              <OrderRow>
                <LabelContainer>
                  <label htmlFor="cardNumber">Número do cartão</label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={formikPagamento.values.cardNumber}
                    onChange={formikPagamento.handleChange}
                    onBlur={formikPagamento.handleBlur}
                  />
                  {formikPagamento.touched.cardNumber &&
                    formikPagamento.errors.cardNumber && (
                      <ErrorMessage>
                        {formikPagamento.errors.cardNumber}
                      </ErrorMessage>
                    )}
                </LabelContainer>

                <LabelContainer width="86px">
                  <label htmlFor="cvv">CVV</label>
                  <input
                    type="text"
                    id="cvv"
                    name="cvv"
                    value={formikPagamento.values.cvv}
                    onChange={formikPagamento.handleChange}
                    onBlur={formikPagamento.handleBlur}
                  />
                  {formikPagamento.touched.cvv &&
                    formikPagamento.errors.cvv && (
                      <ErrorMessage>{formikPagamento.errors.cvv}</ErrorMessage>
                    )}
                </LabelContainer>
              </OrderRow>

              <OrderRow>
                <LabelContainer>
                  <label htmlFor="dueMonth">Mês de vencimento</label>
                  <input
                    type="text"
                    id="dueMonth"
                    name="dueMonth"
                    value={formikPagamento.values.dueMonth}
                    onChange={formikPagamento.handleChange}
                    onBlur={formikPagamento.handleBlur}
                  />
                  {formikPagamento.touched.dueMonth &&
                    formikPagamento.errors.dueMonth && (
                      <ErrorMessage>
                        {formikPagamento.errors.dueMonth}
                      </ErrorMessage>
                    )}
                </LabelContainer>

                <LabelContainer>
                  <label htmlFor="dueYear">Ano de vencimento</label>
                  <input
                    type="text"
                    id="dueYear"
                    name="dueYear"
                    value={formikPagamento.values.dueYear}
                    onChange={formikPagamento.handleChange}
                    onBlur={formikPagamento.handleBlur}
                  />
                  {formikPagamento.touched.dueYear &&
                    formikPagamento.errors.dueYear && (
                      <ErrorMessage>
                        {formikPagamento.errors.dueYear}
                      </ErrorMessage>
                    )}
                </LabelContainer>
              </OrderRow>

              <OrderButton className="marginTop" type="submit">
                Finalizar pagamento
              </OrderButton>

              <OrderButton type="button" onClick={fecharPagamento}>
                Voltar para edição de endereço
              </OrderButton>
            </form>
          ) : (
            <form id="deliveryForm" onSubmit={formikEntrega.handleSubmit}>
              <OrderTitle>Entrega</OrderTitle>

              <OrderRow>
                <LabelContainer>
                  <label htmlFor="name">Quem irá receber</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formikEntrega.values.name}
                    onChange={formikEntrega.handleChange}
                    onBlur={formikEntrega.handleBlur}
                  />
                  {formikEntrega.touched.name && formikEntrega.errors.name && (
                    <ErrorMessage>{formikEntrega.errors.name}</ErrorMessage>
                  )}
                </LabelContainer>
              </OrderRow>

              <OrderRow>
                <LabelContainer>
                  <label htmlFor="endereco">Endereço</label>
                  <input
                    type="text"
                    id="endereco"
                    name="endereco"
                    value={formikEntrega.values.endereco}
                    onChange={formikEntrega.handleChange}
                    onBlur={formikEntrega.handleBlur}
                  />
                  {formikEntrega.touched.endereco &&
                    formikEntrega.errors.endereco && (
                      <ErrorMessage>
                        {formikEntrega.errors.endereco}
                      </ErrorMessage>
                    )}
                </LabelContainer>
              </OrderRow>

              <OrderRow>
                <LabelContainer>
                  <label htmlFor="cidade">Cidade</label>
                  <input
                    type="text"
                    id="cidade"
                    name="cidade"
                    value={formikEntrega.values.cidade}
                    onChange={formikEntrega.handleChange}
                    onBlur={formikEntrega.handleBlur}
                  />
                  {formikEntrega.touched.cidade &&
                    formikEntrega.errors.cidade && (
                      <ErrorMessage>{formikEntrega.errors.cidade}</ErrorMessage>
                    )}
                </LabelContainer>
              </OrderRow>

              <OrderRow>
                <LabelContainer>
                  <label htmlFor="cep">CEP</label>
                  <input
                    type="text"
                    id="cep"
                    name="cep"
                    value={formikEntrega.values.cep}
                    onChange={formikEntrega.handleChange}
                    onBlur={formikEntrega.handleBlur}
                  />
                  {formikEntrega.touched.cep && formikEntrega.errors.cep && (
                    <ErrorMessage>{formikEntrega.errors.cep}</ErrorMessage>
                  )}
                </LabelContainer>

                <LabelContainer>
                  <label htmlFor="numero">Número</label>
                  <input
                    type="text"
                    id="numero"
                    name="numero"
                    value={formikEntrega.values.numero}
                    onChange={formikEntrega.handleChange}
                    onBlur={formikEntrega.handleBlur}
                  />
                  {formikEntrega.touched.numero &&
                    formikEntrega.errors.numero && (
                      <ErrorMessage>{formikEntrega.errors.numero}</ErrorMessage>
                    )}
                </LabelContainer>
              </OrderRow>

              <OrderRow>
                <LabelContainer>
                  <label htmlFor="complemento">Complemento (opcional)</label>
                  <input
                    type="text"
                    id="complemento"
                    name="complemento"
                    value={formikEntrega.values.complemento}
                    onChange={formikEntrega.handleChange}
                    onBlur={formikEntrega.handleBlur}
                  />
                </LabelContainer>
              </OrderRow>

              <OrderButton className="marginTop" type="submit">
                Continuar com pagamento
              </OrderButton>
              <OrderButton type="button" onClick={fecharPedido}>
                Voltar para o carrinho
              </OrderButton>
            </form>
          )}
        </>
      )}
    </OrderContainer>
  )
}

export default Checkout
