
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';
import PropTypes from 'prop-types';

// Create styles
const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
    padding: 10,
    textAlign: 'center',
    backgroundColor: '#07332F',
    width: '100%',
  },
  headerText: {
    color: 'white',
    fontSize: 18,
    width: '100%',
  },
  page: {
    padding: 5,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  section: {
    margin: 5,
    padding: 5,
    flexGrow: 1,
    alignItems: 'center',
  },
  footer: {
    marginTop: 20,
    padding: 10,
    fontSize: 10,
    textAlign: 'right',
    borderTop: 1,
    borderTopColor: '#000',
    borderTopStyle: 'solid',
  },
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  table: {
    display: 'table',
    width: 'auto',
    margin: 'auto',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableCol: {
    width: '50%',
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#000',
    padding: 5,
    textAlign: 'center',
  },
  productImage: {
    width: 180,
    height: 180,
    marginVertical: 20,
    objectFit: true,
  },
});

const date = new Date();

const MyDocument = ({ asset }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={[styles.headerText, styles.title]}>{asset.company_name}</Text>
      </View>
      <View style={styles.section}>
        <Image style={styles.productImage} src={asset.image} />
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text>Product Name</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>{asset.product_name}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text>Type</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>{asset.type}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text>Availability</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>{asset.availability}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text>Company</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>{asset.company_name}</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCol}>
              <Text>Added Date</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>{new Date(asset.added_date).toLocaleDateString()}</Text>
            </View>
          </View>
        </View>
      </View>
      <View style={styles.footer}>
        <Text>{new Date(date).toLocaleDateString()}</Text>
      </View>
    </Page>
  </Document>
);

MyDocument.propTypes = {
  asset: PropTypes.object.isRequired,
};

export default MyDocument;
