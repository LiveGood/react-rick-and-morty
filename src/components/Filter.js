import React, { useEffect, useContext } from 'react';
import styled, { css } from 'styled-components';
import { Row, Col } from 'react-grid-system';
import { debounce } from 'lodash';

import { Select, Input } from '../components/common/'

const PageHead = styled.div`
	margin-bottom: 30px;
`
PageHead.Filter = styled.div`
  ${({ theme }) => css`
    @media ${theme.mediaQueries.xsOnly} {
      width: 100%;
    }
  `}
`;


const InputFilter = ({ context }) => {
  const { filters, setFilters, inputValues } = useContext(context)

  const changeInputFilter = debounce(({ target }) => {
    setFilters({ name: target.value })
  }, 600)

  return <Input
    name="name"  // change later if needed
    label={inputValues.label}
    placeholder={inputValues.placeholder}
    defaultValue={filters?.name}
    onChange={ev => {
      ev.persist();
      changeInputFilter(ev);
    }}
  />
}

const SelectFilter = ({ context }) => {
  const {items, propName, filters, setFilters, selectValues} = useContext(context)

  return (
    <Select
      label={selectValues.label} 
      placeholder={selectValues.placeholder}
      value={filters && filters[propName]}
      defaultValue={'default'}
      options={items?.map((item) => ({ name: item[propName], value: item[propName] }))}
      onChange={ev => setFilters({ [propName]: ev.target.value })}
    />
  )
}

const Filter = function({ context }) {
  const {filters, queryCall, showSelect } = useContext(context)
  const [getData, { data }] = queryCall();
  
  useEffect(() => {
    getData()
  }, [getData])

  useEffect(() => {
    if (filters) {
      getData({ vriables: {filter: filters} })
    }
  }, [filters, getData])

  return (
    <PageHead>  
      <PageHead.Filter>
        <Row>
          <Col>
            <InputFilter {...{ context }}/>
          </Col>
          {showSelect && (
            <Col>
              <SelectFilter {...{ context }}/>
            </Col>
          )}
        </Row>
      </PageHead.Filter>
    </PageHead>
  )
}

export default Filter;